import { User } from "@prisma/client";
import { prisma } from "../../../prisma/Client";
import { CreateUserDTO } from "../DTO/CreateUserDTO";

export class CreateUser {
  async create({name, email, password}: CreateUserDTO): Promise<User>{

    //verifica se já existe um usuário cadastrado com o email passado como parâmetro
    const userExists = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(userExists){
      //Error
    }

    //cria um usuário com os parâmetros passados
    const user = await prisma.user.create({
      data:{
        name, email, password
      }
    })

    return user
  }
}
