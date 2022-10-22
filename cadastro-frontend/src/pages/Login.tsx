import { useState, ChangeEvent, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/Auth/AuthContext"
import Swal from 'sweetalert2'

export default function () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/')
    }
  })

  const handleSubmit = async () => {

    if (!email || !password) {

      Swal.fire('Invalid input', 'Please fill in all required fields', 'error')
      return
    }

    //AuthContext -> useApi -> requisição para a API -> resposta
    const response = await auth.signin(email, password)

    if (response) {

      navigate('/')
      return
    }

    Swal.fire('Login error', 'Unregistred user', 'error')
    navigate('/register')
    return

  }

  return <>
    <div className="tittle"><h1>Login</h1></div>

    <div className="form">
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
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  </>
}
