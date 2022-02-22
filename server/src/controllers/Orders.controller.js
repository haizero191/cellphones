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
        console.log(req.body)
        try{
            var response = await data.save();
            res.send({success: true, message: "Create success..."})
        }
        catch(err) {
            res.send({success: false , message: "some thing was wrong...!"})
        }
    }

    //[POST] api/orders/remove?id={...}
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

    //[POST] api/orders/changeStatusOrder?id={...}
    async changeStatusOrder(req,res,next) {
        const options = {new: true}
        var id = req.query.id;
        var newStatus = req.query.status

        try {
            var order = await OrderModel.findById(id);
            order.order.status = newStatus;
            
            try {
                var response = await OrderModel.findByIdAndUpdate({_id: id},order,options);
                res.json({success: true, message: "Update status order successfully...!"});
            }
            catch(error) {
                res.json({success: false, message: "Can't change status order"})
            }

        }
        catch(err) {
            res.json({success: false, message: "Can't find order"})
        }

       
    }
}

module.exports = new OrderController;