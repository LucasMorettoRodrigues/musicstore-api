import { Request, Response, } from "express"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/User")

export const register = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
        })

        res.status(201).json("User created.")
    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new Error("Plese provide email and password.")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('No registered user with this email')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            throw new Error('Wrong Password')
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME,
            }
        )

        res.status(200).json({ user: { username: user.username, email: user.email }, token })

    } catch (error: any) {
        res.status(505).json({ error: error.message })
    }
}