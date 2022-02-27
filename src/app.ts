import express from 'express'
require('dotenv').config()

import productsRouter from './routes/products'

// DB Connection
import ConnectDB from './db/connect'

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/api/v1/products", productsRouter)

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