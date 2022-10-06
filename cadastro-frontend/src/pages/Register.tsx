import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi"

export default function () {
  const api = useApi()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {

    if (!name || !email || !password) {

      alert('Please fill in all required fields')
      return
    }

    const data = { name, email, password }
    const response = await api.create(data)

    if (response.message) {

      if (response.message) {

        alert(`Status: ${response.message} \nUser ID: ${response.id}`)

        navigate('/')
        return
      }

      alert(`Status: ${response.status} \nError: ${response.error}`)
    }
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
