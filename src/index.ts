import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE, TAccount } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

/* app.get("/accounts/:id", (req: Request, res: Response) => {
    const idToFind = req.params.id

    const result = accounts.find((account) => account.id === idToFind)
    res.status(200).send(result)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const accountIndex = accounts.findIndex((account) => {
        account.id === idToDelete
    })

    if (accountIndex >= 0) {
        accounts.splice(accountIndex, 1)
    }

    res.status(200).send("Item deletado com sucesso!")
})
 */
app.put("/accounts/:id", (req:Request, res:Response) => {
    const idToEdit = req.params.id;

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined
    
    const account = accounts.find((account) => {
      return account.id === idToEdit
    })

    if (account) {
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.balance = isNaN(Number(newBalance)) ? account.balance : newBalance as number
        account.type = newType || account.type
    } 
    
    res.status(200).send("Atualização realizada com sucesso!")
})