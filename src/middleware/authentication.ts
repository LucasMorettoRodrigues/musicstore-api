import { NextFunction, Request, Response } from "express"
const jwt = require('jsonwebtoken')

const auth = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = { userId: payload.userId, username: payload.username }
        next()
    } catch (error) {
        throw new Error('Authentication invalid')
    }
}

module.exports = auth