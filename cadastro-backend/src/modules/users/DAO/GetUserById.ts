import { ServerError } from "../../../errors/ServerError"
import { prisma } from "../../../prisma/Client"
import { GetUserByIdDTO } from "../DTO/GetUserByIdDTO"

type User = {
  idUser: number,
  name: string,
  email: string
}

export class GetUserById {

  async execute({ idUser }: GetUserByIdDTO): Promise<User> {

    const user = await prisma.user.findUnique({
      where: {
        idUser
      },
      select: {
        idUser: true,
        name: true,
        email: true,
        password: false
      }
    })

    if (!user) {
      throw new ServerError("User not found", 404)
    }

    return user
  }
}
