import { PropsWithChildren, createContext } from "react"
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";


interface AuthContext {
  signin: (email: string, password: string) => Promise<boolean>
  signout: (token: string) => Promise<void>
  getLoggedUser: (token: string) => Promise<User>
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthContextProvider(props: PropsWithChildren) {

  const api = useApi()

  const signin = async (email: string, password: string) => {

    const data = await api.signin(email, password)

    if (data) {
      setToken(data.sesid)

      return true
    }

    return false
  }


  const signout = async (token: string) => {

    await api.signout(token)
    setToken('')

  }

  const getLoggedUser = async () => {

    const token = localStorage.getItem('authToken')

    if (token) {

      return await api.getLoggedUser(token)

    }

    return null
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
    window.location.href = window.location.href
  }

  return <>
    <AuthContext.Provider value={{ signin, signout, getLoggedUser }}>
      {props.children}
    </AuthContext.Provider>
  </>
}
