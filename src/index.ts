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

// Busca todas as contas
app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

// Busca conta por ID
app.get("/accounts/:id", (req: Request, res: Response) => {
    const idToFind = req.params.id

    const result = accounts.find((account) => account.id === idToFind)
    res.status(200).send(result)
})

// Busca conta por ID para deletar
app.delete("/accounts/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const accountIndex = accounts.findIndex((account) => {
        account.id === idToDelete
    })

    accountIndex < 0 ? res.status(404).send("Conta não encontrada") : accounts.splice(accountIndex, 1) && res.status(200).send("Item deletado com sucesso!")
})

app.put("/accounts/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.name as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const accountFound = accounts.find((account) => {
        return account.id === id
    })

    console.log(accountFound)

    if (accountFound) {
        accountFound.id = newId || accountFound.id
        accountFound.ownerName = newOwnerName || accountFound.ownerName
        accountFound.balance = isNaN(Number(newBalance)) ? accountFound.balance : newBalance as number
        accountFound.type = newType || accountFound.type
    }

    res.status(200).send("Atualização realizada com sucesso!")
})