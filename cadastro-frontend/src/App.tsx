import './App.css'
import Login from './pages/Login'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import UserPage from './pages/ManageAccount'
import Register from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from './contexts/Auth/AuthContext'
import Update from './pages/Update'

export default function () {
  const auth = useContext(AuthContext)

  const handleLogout = async () => {

    await auth.signout(localStorage.getItem('authToken')!);
  }

  return <>
    <Routes>
      <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
      <Route path='/login' element={<Login />} />
      <Route path='/manageAccount' element={<RequireAuth><UserPage /></RequireAuth>} />
      <Route path='/register' element={<Register />} />
      {/*Objetivo: criar uma tela para gerenciar todos os usuários
      <Route path='/update' element={<RequireAuth><Update /></RequireAuth>} />
      */}
    </Routes>
    <footer>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/manageAccount">Manage account</Link>
        {!localStorage.getItem('authToken') && <Link to="/login">Login</Link>}
        <Link to="/register">Register</Link>
        {/*<Link to="/update">Update</Link>*/}
        {localStorage.getItem('authToken') && <Link to="" onClick={handleLogout}>Logout</Link>}
      </nav>
    </footer>

  </>
}
