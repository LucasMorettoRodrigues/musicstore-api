import express from 'express'
require('dotenv').config()

const app = express()

// DB Connection
import ConnectDB from './db/connect'

// routers
const productsRouter = require('./routes/productRoutes')
const authRouter = require('./routes/authRoutes')


app.use(express.json())

app.use("/api/v1/products", productsRouter)
app.use("/api/v1/auth", authRouter)

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