export class ServerError {
  public readonly message: String

  public readonly statusCode: number

  constructor(messsage: String, statusCode = 400) {
    this.message = messsage
    this.statusCode = statusCode
  }
}
