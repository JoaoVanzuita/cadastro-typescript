import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from 'cors'
import { CreateUser } from "./modules/users/DAO/CreateUser"
import { AppError } from "./errors/appError"
import { Login } from "./modules/users/DAO/Login"
import { GetUserById } from "./modules/users/DAO/GetUserById"
import { GetAllUsers } from "./modules/users/DAO/GetAllUsers"
import { UpdateUser } from "./modules/users/DAO/UpdateUser"
import { DeleteUser } from "./modules/users/DAO/DeleteUser"

//factory function: função que fabrica um objeto (paradigma funcional)
//new Express() - orientado a objeto
const app = express()

const port = 8080
const session: any = {}

app.use("/", express.static("../cadastro-frontend/dist"))
app.use(express.json())
app.use(cors());

app.listen(port, () => console.log(`Server online - Running on port ${port}`))

//GET ALL USERS
app.get("/api/users", async (req, res) => {

  const getAllUsers = new GetAllUsers()

  const result = await getAllUsers.execute()

  res.json({
    "status": 200,
    "message": "success",
    "data": result
  })
})

//GET USER BY ID
app.get("/api/user/:id", async (req, res) => {

  const idUser = Number(req.params.id)

  const getUserById = new GetUserById()

  const result = await getUserById.execute({ idUser })

  res.json({
    "status": 200,
    "message": "success",
    "data": result
  })
})

//CREATE USER
app.post("/api/user/", async (req, res) => {

  const errors = []

  if (!req.body.name) {
    errors.push('no name epecified')
  }
  if (!req.body.email) {
    errors.push('no email epecified')
  }
  if (!req.body.password) {
    errors.push('no password epecified')
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join() })
  }

  const { name, email, password } = req.body

  const createUser = new CreateUser();

  const result = await createUser.execute({ name, email, password })

  if (result) {
    res.status(201).json({
      "status": 201,
      "message": "success",
      "id": result
    })
  }
})

//UPDATE USER
app.patch("/api/user/:id", async (req, res) => {
  const errors = []

  if (!req.body.name) {
    errors.push('no name epecified')
  }
  if (!req.body.email) {
    errors.push('no email epecified')
  }
  if (!req.body.password) {
    errors.push('no password epecified')
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join() })
  }

  const { name, email, password } = req.body
  const idUser = Number(req.params.id)

  const updateUser = new UpdateUser()
  const result = await updateUser.execute({ idUser, name, email, password })

  res.status(200).json({
    "status": 200,
    "message": "success",
    "id": result
  })
})

//DELETE USER
app.delete("/api/user/:id", async (req, res) => {
  const idUser = Number(req.params.id)

  const deleteUser = new DeleteUser()
  const result = await deleteUser.execute({ idUser })

  res.status(200).json({
    "status": 200,
    "id": result
  })
})

//LOGIN
app.post("/api/login/", async (req, res) => {

  const { email, password } = req.body
  const login = new Login()

  const user = await login.execute({ email, password })

  if (!user) {
    res.status(404).send()
    return
  }

  require('crypto').randomBytes(48, (err: any, buffer: any) => {
    const token = buffer.toString('hex')
    session[token] = user

    res.json({
      "status": 200,
      "message": "success",
      "sesid": token
    })
  })

})

//verifica user em session[sesid]; se houver, abre a página principal passando o usuário na response
app.get("/api/logged/:sesid", (req, res) => {

  if (session[req.params.sesid] == null) {

    //usuário não cadastrado
    res.status(404).send()

    return
  }

  res.status(200).json(session[req.params.sesid])
})

app.get("/api/logout/:sesid", (req, res) => {
  const deleted = delete session[req.params.sesid]

  if (deleted) {

    res.status(202).send()
    return
  }

  res.status(400).send()
})

//Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      "status": err.statusCode,
      "message": err.message
    })
    return
  }

  res.status(500).json({
    "status": 500,
    "message": `Internal server error - ${err.message}`
  })
})
