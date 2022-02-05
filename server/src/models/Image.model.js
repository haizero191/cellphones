const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Image = new Schema({
    filename: {
        type: String,
        unique: true,
        required: true
    },
    contentType: {
        type: String,
        require: true
    },
    imageBase64: {
        type: String,
        required: true
    },
    createTime: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('image', Image);
