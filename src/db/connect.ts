import mongoose from "mongoose";

const ConnectDB = (uri: string) => {
    return mongoose.connect(uri)
}

export default ConnectDB