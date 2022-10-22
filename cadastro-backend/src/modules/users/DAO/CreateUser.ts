import { User } from "@prisma/client";
import { AppError } from "../../../errors/appError";
import { prisma } from "../../../prisma/Client";
import { CreateUserDTO } from "../DTO/CreateUserDTO";

export class CreateUser {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {

    //verifica se já existe um usuário cadastrado com o email passado como parâmetro
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      throw new AppError("User already exists.")
    }

    //cria um usuário com os parâmetros passados
    const user = await prisma.user.create({
      data: {
        name, email, password
      }
    })

    return user
  }
}
