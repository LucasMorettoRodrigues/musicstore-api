const Order = require('../models/Order')
const Product = require('../models/Product')

import { Request, Response } from "express"

export const createOrder = async (req: Request, res: Response) => {

    type product = {
        productId: string,
        quantity: number
    }

    const cartProducts: product[] = req.body.products
    let orderProducts: product[] = []
    let amount: number = 0

    if (cartProducts.length < 1) {
        throw new Error("Cart is empty.")
    }

    for (const product of cartProducts) {
        const dbProduct = await Product.findOne({ _id: product.productId })
        if (!dbProduct) {
            throw new Error("Product does not exist in database.")
        }
        orderProducts = [...orderProducts, dbProduct]
        amount += dbProduct.price * product.quantity
        console.log(orderProducts)
    }

    try {
        const order = await Order.create({
            userId: req.user.userId,
            products: orderProducts,
            amount: amount
        })

        res.status(201).json({ order })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ err: error.message })
        }
        return res.status(500).json({ err: error })
    }




}