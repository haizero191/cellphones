const OrderModel = require("../models/Order.model");

class OrderController {

    //[GET] api/orders/
    async index(req, res) {
        var id = req.query.id
        if(!id) {
            try {
                let response = await OrderModel.find({});
                res.json(response)
            }catch(err) {
                res.json({success: false ,message: "Can't get Order list"})
            }
        }
        else {
            res.json({success: true})
        }
    }

    //[POST] api/orders/create
    async create(req,res) {
        var data = new OrderModel(req.body);
        try{
            var response = await data.save();
            res.send({success: true, message: "Create success..."})
        }
        catch(err) {
            res.send({success: false , message: "some thing wasn't wrong...!"})
        }
    }

    //[POST] api/orders/remove
    async remove(req, res) {
        var id = req.query.id
        if(id){
            try {
                let response = await OrderModel.findByIdAndRemove({_id: id})
                res.send({success: true, message: "Remove successfully"})
            }catch(err) {
                res.send({ success: false ,message: "Order can't removed"})
            }
        }
        else {
            res.json({success: false, message: "Can't find order id"})
        }
    }
}

module.exports = new OrderController;