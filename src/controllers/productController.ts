import { Request, Response } from "express"
const Product = require('../models/Product')

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}