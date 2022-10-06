import { Database } from "sqlite3"

export const database = new Database(
  'database.sqlite',
  err => {

    if(err){
      throw new Error(`Não foi possível conectar ao banco de dados: ${err.message}`)
    }

    database.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      CONSTRAINT email_unique UNIQUE (email)
    )
    `,  err => {

      if(err){
        throw new Error(`Erro ao criar tabela "users": ${err.message}`)
      }

    })
  },
)
