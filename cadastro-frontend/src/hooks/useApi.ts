import { User } from "../types/User"

export const useApi = () => ({

  signin: async (email: string, password: string) => {

    const response = await fetch(`api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      return await response.json()
    }
    return null
  },
  signout: async (token: string) => {

    const response = await fetch(`api/logout/${token}`)

    return response.ok
  },
  getLoggedUser: async (token: string) => {

    const response = await fetch(`api/logged/${token}`, {
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
    const response = await fetch(`api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    return await response.json()
  },
  update: async (user: User) => {

    const { idUser: id, name, email, password } = user
    const response = await fetch(`api/user/${id}/${localStorage.getItem('authToken')}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    return await response.json()
  },
  delete: async (user: User) => {

    const id = user.idUser
    const response = await fetch(`api/user/${id}/${localStorage.getItem('authToken')}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    return await response.json()
  }
})
