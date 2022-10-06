import { User } from "../types/User"

const baseURL = 'http://localhost:8080/'

//Retorna um objeto que contém os métodos com as requisições ao servidor
export const useApi = () => ({

  signin: async (email: string, password: string) => {

    const response = await fetch(`${baseURL}api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    return await response.json()
  },
  signout: async (token: string) => {

    const response = await fetch(`${baseURL}api/logout/${token}`)

    return response.ok
  },
  getLoggedUser: async (token: string) => {

    const response = await fetch(`${baseURL}api/logged/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {

      return null
    }

    return await response.json()
  },
  create: async (user: User) => {

    const { name, email, password } = user
    const response = await fetch(`${baseURL}api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    return await response.json()
  },
  update: async (user: User) => {

    const { id, name, email, password } = user
    const response = await fetch(`${baseURL}api/user/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    return await response.json()
  },
  delete: async (user: User) => {

    const id = user.id
    const response = await fetch(`${baseURL}api/user/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    return await response.json()
  }
})
