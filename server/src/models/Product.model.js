const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    id: ObjectId,
    name: String,
    current_price: Number,
    old_price: Number,
    amount: Number,
    description: String,
    discount: String,
    category: String,
    brand:String,
    image: Object,
    createTime: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('product', Product);