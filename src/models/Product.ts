import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name."]
    },
    img: {
        type: String,
        required: [true, "Please provide image"]
    },
    price: {
        type: Number,
        required: [true, "Please provide price"]
    },
    category: {
        type: String,
        required: [true, "Please provide category"]
    }
})

module.exports = mongoose.model('Product', ProductSchema)