import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from 'cors'
import { CreateUser } from "./modules/users/DAO/CreateUser"
import { AppError } from "./errors/appError"

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
app.get("/api/users", (req, res) => {
  // const sql = "SELECT id, name, email FROM users"

  // database.all(sql, [], (err, rows) => {

  //   if (err) {
  //     res.status(400).json({ "error": err.message })
  //     return
  //   }

  //   res.json({
  //     "message": "success",
  //     "data": rows
  //   })
  // })
})

//GET USER BY ID
app.get("/api/user/:id", (req, res) => {
  //const sql = "SELECT id, name, email FROM users WHERE id = ?"

  // database.get(sql, [req.params.id], (err, rows) => {

  //   if (err) {
  //     res.status(400).json({ "error": err.message })
  //     return
  //   }

  //   res.json({
  //     "status": 200,
  //     "message": "success",
  //     "data": rows
  //   })
  // })
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

  const result = await createUser.create({ name, email, password })

  if (result.idUser) {
    res.status(201).json({
      "status": 201,
      "message": "success",
      "data": { name, email, password },
      "id": result.idUser
    })
  }
})

//UPDATE USER
app.patch("/api/user/:id", (req, res) => {
  const { name, email, password } = req.body

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

  // const update = `
  //   UPDATE users SET
  //     name = COALESCE(?,name),
  //     email = COALESCE(?,email),
  //     password = COALESCE(?,password)
  //   WHERE
  //     id = ?
  // `

  // database.run(update, [name, email, password, req.params.id], function (this: RunResult, err) {
  //   if (err) {
  //     res.status(400).json({ "message": err.message })
  //     return
  //   }

  //   res.status(200).json({
  //     "message": "success",
  //     "data": { name, email, password },
  //     "changes": this.changes
  //   })

  // })
})

//DELETE USER
app.delete("/api/user/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE id = ?`

  // database.run(sql, [req.params.id], function (this: RunResult, err) {

  //   if (err) {
  //     res.status(400).json({ "error": err.message })
  //     return
  //   }

  //   res.status(200).json({
  //     "message": "success",
  //     "changes": this.changes
  //   })
  // })
})

//LOGIN
app.post("/api/login/", (req, res) => {
  // const sql = "SELECT id, name, email FROM USERS WHERE email = ? AND password = ?"

  // const { email, password } = req.body

  // database.get(sql, [email, password], (err, row) => {

  //   if (err) {
  //     res.status(400).json({ "error": err.message })
  //     return
  //   }

  //   if (!row?.id) {
  //     res.status(404).send()
  //     return
  //   }

  //   require('crypto').randomBytes(48, (err: any, buffer: any) => {
  //     const token = buffer.toString('hex')
  //     session[token] = row

  //     res.json({
  //       "message": "success",
  //       "sesid": token
  //     })
  //   })

  // })
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

  res.status(404).send()
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
