import { User } from "@prisma/client"
import { AppError } from "../../../errors/appError"
import { prisma } from "../../../prisma/Client"

export class GetAllUsers {
  async execute(): Promise<User[]> {

    const users = await prisma.user.findMany()

    if (users.length == 0) {
      throw new AppError("There are no registered users.", 404)
    }

    return users
  }
}
