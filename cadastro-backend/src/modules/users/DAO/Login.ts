import { User } from "@prisma/client"
import { prisma } from "../../../prisma/Client";
import { AppError } from "../../../errors/appError"
import { loginDTO } from "../DTO/LoginDTO"

export class Login {
  async execute({ email, password }: loginDTO): Promise<User> {

    //Gambiarra ._.
    const userRegistered = await prisma.user.findMany({
      where: {
        AND: [
          { email },
          { password }
        ]
      }
    })

    if (userRegistered.length == 0) {
      throw new AppError("User not registered.")
    }

    return userRegistered[0]
  }
}
