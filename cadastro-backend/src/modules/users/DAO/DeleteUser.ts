import { AppError } from "../../../errors/appError";
import { prisma } from "../../../prisma/Client";
import { DeleteUserDTO } from "../DTO/DeleteUserDTO";

export class DeleteUser {
  async execute({ idUser } : DeleteUserDTO): Promise<Number> {

    const userExists = await prisma.user.findUnique({
      where: {
        idUser
      }
    })

    if (!userExists) {
      throw new AppError("User not found.", 404)
    }

    const user = await prisma.user.delete({
      where:{
        idUser
      },
      select:{
        idUser: true,
      }
    })

    return user.idUser
  }
}
