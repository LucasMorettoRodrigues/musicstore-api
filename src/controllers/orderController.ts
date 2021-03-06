const Order = require('../models/Order')
const Product = require('../models/Product')

import { Request, Response } from "express"

export const createOrder = async (req: Request, res: Response) => {

    type product = {
        productId: string,
        quantity: number
    }

    type orderProduct = {
        _id: string,
        quantity: number,
        name: string,
        img: string,
        price: number
    }

    const cart: product[] = req.body.cart
    let orderProducts: orderProduct[] = []
    let amount: number = 0

    try {

        if (cart.length < 1) {
            throw new Error("Cart is empty.")
        }

        for (const product of cart) {
            const dbProduct = await Product.findOne({ _id: product.productId })

            if (!dbProduct) {
                throw new Error("Product does not exist in database.")
            }

            const orderProduct = {
                _id: product.productId,
                quantity: product.quantity,
                name: dbProduct.name,
                img: dbProduct.img,
                price: dbProduct.price
            }

            orderProducts = [...orderProducts, orderProduct]
            amount += dbProduct.price * product.quantity
        }

        const order = await Order.create({
            userId: req.user.userId,
            products: orderProducts,
            amount: amount,
            address: req.body.address
        })

        res.status(201).json( order )

    } catch (error: any) {
        return res.status(500).json({ err: error.message })
    }
}

export const getOrders = async (req: Request, res: Response) => {

    try {
        const orders = await Order.find({ userId: req.user.userId })

        res.status(200).json( orders )
    } catch (error: any) {
        return res.status(500).json({ err: error.message })
    }
}