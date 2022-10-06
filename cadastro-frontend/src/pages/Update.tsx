import { useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { User } from "../types/User"

export default function () {
  const api = useApi()

  const [userData, setUserData] = useState<User>()

  const fetchUser = async () => {

    return await api.getLoggedUser(localStorage.getItem('authToken')!)
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
  }

  return <>
    <div className="tittle"><h1>Update user</h1></div>

    <div className="form">
      <input
        type="text"
        onChange={ev => setUserData({ ...userData!, name: ev.target.value })}
        name="name"
        value={userData?.name}
        placeholder="Enter the name"
      />
      <input
        type="text"
        onChange={ev => setUserData({ ...userData!, email: ev.target.value })}

        name="email"
        value={userData?.email}
        placeholder="Enter the email"
      />
      <input
        type="password"
        onChange={ev => setUserData({ ...userData!, password: ev.target.value })}
        name="password"
        value={userData?.password}
        placeholder="Enter the password"
      />
      <div className="action">
        <button onClick={handleEdit}>Save</button>
      </div>
    </div>
  </>
}
