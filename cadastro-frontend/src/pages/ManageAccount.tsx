import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/Auth/AuthContext"
import { useApi } from "../hooks/useApi"
import { User } from "../types/User"

export default function () {
  const auth = useContext(AuthContext)
  const api = useApi()
  const [userData, setUserData] = useState<User>()

  const fetchUser = async () => {

    const user = await api.getLoggedUser(localStorage.getItem('authToken')!)
    setUserData(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleEdit = async () => {

    if (!userData?.name || !userData?.email || !userData?.password) {

      alert('Please fill in all required fields')
      return
    }

    const response = await api.update(userData!)

    if (response.message) {

      alert(`Status: ${response.message} \nChanges: ${response.changes}`)
      return
    }

    alert(`Status: ${response.status} \nError: ${response.error}`)
    return
  }

  const handleDelete = async () => {

    if (userData) {
      const response = await api.delete(userData)

      if (response.message) {

        alert(`Status: ${response.message} \nChanges: ${response.changes}`)
        auth.signout(localStorage.getItem('authToken')!)
        return
      }

      alert(`Status: ${response.error}`)
      return
    }

    alert('Data was not loaded correctly.')
  }

  return <>
    <div className="tittle"><h1>Manage account</h1></div>

    <div className="form">
      <input
        type="text"
        onChange={ev => setUserData({ ...userData!, name: ev.currentTarget.value })}
        name="name"
        value={userData?.name}
        placeholder="Enter your name"
      />
      <input
        type="text"
        onChange={ev => setUserData({ ...userData!, email: ev.currentTarget.value })}
        name="email"
        value={userData?.email}
        placeholder="Enter your email"
      />
      <input
        type="password"
        onChange={ev => setUserData({ ...userData!, password: ev.currentTarget.value })}

        name="password"
        value={userData?.password}
        placeholder="Enter your password"
      />
      <div className="action" >
        <button onClick={handleEdit}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </>
}
