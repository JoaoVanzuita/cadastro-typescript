import { AppError } from "../../../errors/appError"
import { prisma } from "../../../prisma/Client"

type User = {
  idUser: number,
  name: string,
  email: string
}

export class GetAllUsers {
  async execute(): Promise<User[]> {

    const users = await prisma.user.findMany({
      select:{
        idUser: true,
        name: true,
        email: true,
        password: false
      }
    })

    if (users.length == 0) {
      throw new AppError("There are no registered users.", 404)
    }

    return users
  }
}
