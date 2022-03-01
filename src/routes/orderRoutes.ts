const { createOrder, getOrders } = require('../controllers/orderController')
const express = require('express')
const router = express.Router()

router.post('/', createOrder)
router.get('/', getOrders)

module.exports = router
