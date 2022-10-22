import { useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"
import { User } from "../types/User"

export default function () {
  const api = useApi()
  const [userData, setUserData] = useState<User>()

  const fetchUser = async () => {

    const user = await api.getLoggedUser(localStorage.getItem('authToken')!)
    setUserData(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return <>
    <div className="tittle"><h1>Home</h1></div>

    <div className="form">
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData?.idUser}</td>
            <td>{userData?.name}</td>
            <td>{userData?.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
}
