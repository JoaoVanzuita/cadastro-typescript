import { User } from "@prisma/client"
import { AppError } from "../../../errors/appError"
import { prisma } from "../../../prisma/Client"
import { GetUserByIdDTO } from "../DTO/GetUserByIdDTO"

export class GetUserById {
  
  async execute({idUser}: GetUserByIdDTO): Promise<User> {

    const user = await prisma.user.findUnique({
      where:{
        idUser
      }
    })

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    return user
  }
}
