import express from 'express'
require('dotenv').config()
const cors = require('cors')

const app = express()

// DB Connection
import ConnectDB from './db/connect'

// Middlewares
const authentication = require('./middleware/authentication')

// routers
const productsRouter = require('./routes/productRoutes')
const authRouter = require('./routes/authRoutes')
const orderRouter = require('./routes/orderRoutes')
const stripeRouter = require('./routes/stripeRoutes')

app.use(cors())
app.use(express.json())

app.use("/api/v1/products", productsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/orders", authentication, orderRouter)
app.use("/api/v1/checkout", authentication, stripeRouter)

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