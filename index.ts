import express, { Express, Response } from 'express'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Task } from './src/tasks/tasks.entity'
import { tasksRouter } from './src/tasks/tasks.router'

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(cors())

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    synchronize: true,
    entities: [Task],
})

app.use('/tasks', tasksRouter)

app.get('/', (_, res: Response) => {
    res.send('Server is running!')
})

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

        console.log('Data Source has been initialized')
    })
    .catch((error) => {
        console.error('Error during Data Source initialization', error)
    })
