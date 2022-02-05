const BrandModel = require("../models/Brand.model");


class BrandController {
    async index(req,res,next) {
        try{
            var response = await BrandModel.find({});
            res.json(response)
        }
        catch(err) {
            console.log("Can't get Brand...!check and again...!: ",err);
        }
    }

    async create(req,res) {
        if(req.body.name.length !== 0) {
            var brand = new BrandModel();
            brand.name = req.body.name;
            try{
                var brands = await BrandModel.find({name: req.body.name})
                if(brands.length === 0) {
                    var response = await brand.save()
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


module.exports = new BrandController();