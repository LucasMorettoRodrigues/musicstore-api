const express = require('express')
const router = express.Router()

const { getProducts } = require('../controller/product')

router.route('/').get(getProducts)

export default router