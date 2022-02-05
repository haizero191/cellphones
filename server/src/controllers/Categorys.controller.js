const CateModel = require("../models/Cate.model");


class CategoryController {
    async index(req,res,next) {
        try{
            var response = await CateModel.find({});
            res.json(response)
        }
        catch(err) {
            console.log("Can't get Category...!check and again...!: ",err);
        }
    }

    async create(req,res) {
        if(req.body.name.length !== 0) {
            var category = new CateModel();
            category.name = req.body.name;
            try{
                var cates = await CateModel.find({name: req.body.name})
                if(cates.length === 0) {
                    var response = await category.save()
                    res.json({success: true, response})
                }else {
                    res.json({success: false, message: "Category already exists...!"})
                }
            }
            catch(err) {
               res.json({success: false, message: "Some thing was't wrong..!"})
            }
        }
        else {
            res.send({success: false,message:"Category is empty...!"})
        }
        
    }
}


module.exports = new CategoryController();