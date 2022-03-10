import { Request, Response } from "express"
const Product = require('../models/Product')

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getProducts = async (req: Request, res: Response) => {

    type queryType = {
        "category"?: string,
    }

    const queryObject: queryType = {}

    if (typeof req.query.category === "string") queryObject.category = req.query.category

    try {
        const products = await Product.find(queryObject)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}