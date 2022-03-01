import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            },
            img: {
                type: String,
            },
            price: {
                type: Number,
            }
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)