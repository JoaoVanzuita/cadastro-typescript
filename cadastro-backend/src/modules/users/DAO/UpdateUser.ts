import { User } from "@prisma/client";
import { AppError } from "../../../errors/appError";
import { prisma } from "../../../prisma/Client";
import { UpdateUserDTO } from "../DTO/UpdateUserDTO";

export class UpdateUser {
  async execute({ idUser, name, email, password }: UpdateUserDTO): Promise<User> {

    //verifica se já existe um usuário cadastrado com o email passado como parâmetro
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userExists) {
      throw new AppError("User not found.", 404)
    }

    const user = await prisma.user.update({
      where:{
        idUser
      },
      data: {
        name, email, password
      },
      select:{
        idUser: true,
        name: true,
        email: true,
        password: true
      }
    })

    return user
  }
}
