const mongoose = require("mongoose");
const config = require("../../config")

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log("mongoDB connected ^^")

    }
    catch(err) {
        console.log("connection failed with " + err)
    }
}


module.exports = connectDB;