import express from 'express'
require('dotenv').config()

// DB Connection
import ConnectDB from './db/connect'

const app = express()

const port = 5000

const startApp = async () => {
    try {
        await ConnectDB(process.env.MONGO_URI!)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

startApp()