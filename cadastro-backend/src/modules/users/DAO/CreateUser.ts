import { ServerError } from "../../../errors/ServerError";
import { prisma } from "../../../prisma/Client";
import { CreateUserDTO } from "../DTO/CreateUserDTO";

export class CreateUser {
  async execute({ name, email, password }: CreateUserDTO): Promise<number> {

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      throw new ServerError("User already registered")
    }

    //cria um usuário com os parâmetros passados
    const user = await prisma.user.create({
      data: {
        name, email, password
      }
    })

    return user.idUser
  }
}
