import { ServerError } from "../../../errors/ServerError"
import { prisma } from "../../../prisma/Client"

type User = {
  idUser: number,
  name: string,
  email: string
}

export class GetAllUsers {
  async execute(): Promise<User[]> {

    const users = await prisma.user.findMany({
      select: {
        idUser: true,
        name: true,
        email: true,
        password: false
      }
    })

    if (!users.length) {
      throw new ServerError("Users not found", 404)
    }

    return users
  }
}
