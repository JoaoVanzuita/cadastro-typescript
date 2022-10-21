import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useApi } from "../hooks/useApi"

export default function () {
  const api = useApi()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {

    if (!name || !email || !password) {

      Swal.fire('Invalid input', 'Please fill in all required fields', 'error')
      return
    }

    const data = { name, email, password }
    const response = await api.create(data)

    if (response.message) {

      Swal.fire(`Success`, `Status: ${response.message} \nUser id: ${response.id}`, `success`)

      navigate('/')
      return
    }

    Swal.fire(`Api error`, `Status: ${response.status} \nError: ${response.error}`, `error`)
  }
  return <>
    <div className="tittle"><h1>User registration</h1></div>

    <div className="form">
      <input
        type="text"
        onChange={ev => setName(ev.currentTarget.value)}

        name="name"
        value={name}
        placeholder="Enter your name"
      />
      <input
        type="text"
        onChange={ev => setEmail(ev.currentTarget.value)}
        name="login"
        value={email}
        placeholder="Enter your email"
      />
      <input
        type="password"
        onChange={ev => setPassword(ev.currentTarget.value)}

        name="password"
        value={password}
        placeholder="Enter your password"
      />
      <div className="action">
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  </>
}
