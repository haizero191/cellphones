const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
    id: ObjectId,
    user: {
        infomation: {
            username: String,
            fullname: String,
            birthDay: String,
            address: {type: String, required: true},
        }
    },
    order: {
        cart: {type: Array, "default": []},
        payment: {type: String, required: true},
        subTotal: {type: Number, required: true},
        status: {type: String, required: true}
    }
});

module.exports = mongoose.model('order', Order);