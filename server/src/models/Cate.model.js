const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    id: ObjectId,
    name: {type: String, required: true},
    createTime: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('category', Category);