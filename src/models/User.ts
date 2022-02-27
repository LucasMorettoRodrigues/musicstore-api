import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)