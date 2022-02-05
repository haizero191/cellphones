const Product = require("../models/Product.model");
const store = require("../middleware/multer");
const Image = require("../models/Image.model");
const fs = require('fs')
const mongoose = require("mongoose");
const path = require("path")
const CateModel = require("../models/Cate.model");
const ProductModel = require("../models/Product.model");



class ProductController {
    // [GET] /products
    async index(req, res, next) {
        let id = req.query.id;
        let perpage = req.query.perpage;
        let page = req.query.page;
      
        if(!id) {
            if(page) {
                page = parseInt(page);
                if(page < 1)
                    page = 1
                if(!perpage) 
                    perpage = 6;
                else 
                    perpage = parseInt(perpage);
                var skipAmount = (page-1) * perpage;
                var response = await Product.find({})
                                    .skip(skipAmount)
                                    .limit(perpage)
                                    
                res.json({success: true, data: response})
            }
            else {
                Product.find({}, function (err, data) {    
                    if(!err)
                        res.json(data);
                    else 
                        res.status(404).json({sucess: false,error: "error"})
                });
            }
        }
        else {       
            Product.findOne({_id: id})
                .then((data) => {
                    res.json(data)
                })
                .catch(next) 
        }
    }
    

    // [POST] /products/create
    async add(req, res, next) {
        // upload image file with {image: file}
        const files = req.files;
        var checkIncludeName = await Product.findOne({name: req.body.name})
        if(files.length === 0) {
            res.send({success: false, message: "please choose image file"})
        }
        else if(checkIncludeName){
            fs.unlink(`./public/uploads/${files[0].filename}`, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            res.send({success: false,message:"product already exists...!"});
        }
        else if(req.body === {}){
            fs.unlink(`./public/uploads/${files[0].filename}`, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            res.send({success: false,message: "add failed"});
        }
        else {        
            let objProduct = {
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                current_price: req.body.current_price,
                old_price: req.body.old_price,
                description: req.body.description,
                discount: req.body.discount,
                category: req.body.category,
                brand: req.body.brand,
                image: {
                    id: new mongoose.Types.ObjectId(),
                    data: {
                        url: process.env.URL_WEB + "/api/image/" + files[0].filename,
                        filename: files[0].filename,
                        name: files[0].originalname,
                        size: files[0].size,
                        encoding: files[0].encoding,
                        mimetype: files[0].mimetype
                    }
                }
            }

            try {
                var cate = new CateModel();
                cate.name = req.body.category
                var response = await CateModel.find({name: req.body.category})
                if(response.length === 0)
                    await cate.save()
            }
            catch(err) {
                console.log("errrrrrrr: ",err)
            }
            //create model Product
            let product = new Product(objProduct)
            console.log(product)
            // create code base64 with image
            let imgArr = files.map(file => {
                let img = fs.readFileSync(file.path);
                return img.toString("base64")
            })
            
            // create image model with request
            var finalImg ={}
            imgArr.map((src,index) => {
                finalImg = {
                    _id: product.image.id,
                    filename: files[index].originalname,
                    contentType: files[index].mimetype,
                    imageBase64: src
                }
            })
            var newUpload = new Image(finalImg)
            // save image to database
            try {
                var uploadImage = await newUpload.save();
                try {   
                    // hàm save để lưu vào db
                    var response = await product.save()  
                    res.json({success: true, ...{response}})

                } catch (error) {
                    res.json({success: false, message: "add failed"})
                }
            }
            catch (error) {
                fs.unlink(`./public/uploads/${product.image.data.filename}`, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                res.json({success: false, message: "Image file is exists...!"})
            }  
        }
        
    }

    async remove(req, res, next) {
        let id = req.query.id;
        console.log(id)
        if(id) 
        {
            try {      
                let product = await Product.findById(id);
                let imageID = product.image.id;
                // xoa hinh anh trong public folder
                fs.unlink(`./public/uploads/${product.image.data.filename}`, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
                // xoa san pham theo id
                await Product.deleteOne({ _id: id }); 
                // xoa hinh anh theo id
                await Image.deleteOne({ _id: imageID });  
                res.json({success: true, message: "Remove product successfully...!"})
            } catch (error) {
                res.send({success: false, message: "Remove failed"})
            }
        }
        else {
            res.send({success: false, message: "Can't find id"})
        }
    }

    async edit(req, res, next) {
        const id = req.query.id;
        const files = req.files;
        const options = {new: true}

        if(files.length == 0)   // không có file ảnh được gửi  lên 
        {
            console.log("--> Update don't have image file success...!")
            let productUpdate = req.body                                       // update request body 
            try {     
                await Product.findByIdAndUpdate(id, productUpdate , options)    
                res.send({success: true,message: "Update successfully...^^"})
            } catch (error) {
                res.send({sucess: false, message: "Edit failed"})
            }
        }
        else {          // có file ảnh được gửi lên 
            console.log("--> Update have image file success...!")
            let dataImg = {}
            if(!req.body){
                res.status(400);
                res.send({sucess: false, message: "Edit failed"})
            }
            else {
                let productUpdate = req.body;
                let product = await Product.findById({_id:id});
                dataImg = {
                    url: "http://localhost:4000/api/image/" + files[0].filename,
                    filename: files[0].filename,
                    name: files[0].originalname,
                    size: files[0].size,
                    encoding: files[0].encoding,
                    mimetype: files[0].mimetype
                }
    
                // xóa ảnh cũ khi cập nhật
                fs.unlink(`./public/uploads/${product.image.data.filename}`, function (err) {
                    if (err) throw err;
                    console.log('--> Old image was deleted !');
                });
    
                product.image.data = dataImg;
                // update image into db
                let image = {
                    filename: files[0].originalname,
                    contentType: files[0].mimetype,
                    imageBase64: fs.readFileSync(files[0].path).toString("base64")
                }

                try {     
                    await Image.findByIdAndUpdate(product.image.id,image,options)    // hàm save để lưu vào db  db.images
                    await Product.findByIdAndUpdate(id, product,options)             // hàm save để lưu vào db  db.products
                    await Product.findByIdAndUpdate(id, productUpdate,options) 
                    res.send({success: true})
                } catch (error) {
                    res.send({sucess: false, message: "Edit failed"})
                }
            }
        }    
    }


    async filter(req,res,next) {
        let name = req.query.name;
        console.log(name)
        let brand = req.query.brand;
        let cate = req.query.brand;
        let page = req.query.page; 
        if(!page) {
            page = 1;
        }

        page = parseInt(page);
        console.log(page)
        if(page < 1)
            page = 1    
        var skipAmount = (page-1) * 8;
        try {
            var response = await ProductModel.find({name: {$regex: name, $options: '$i'}})
            .skip(skipAmount)
            .limit(8)

            res.json({success: true, response})
        }catch(error) {
            res.json({success: false, message:"Some thing wasn't wrong...!"})
        }
        

        // try {
        //     var response = await ProductModel.find({name: {$regex: name, $options: '$i'}})
        //     .skip(0)
        //     .limit(8)
    
        //     res.json({response})
        // }catch(error) {
        //     res.json({success: false, message:"Some thing wasn't wrong...!"})
        // }
        
    }

    

    async searchWithCategory(req,res,next) {
        let category = req.query.category;
        if(!category) {
            res.json({sucess: false, message: "Can't find data search"})
        }
        else {
            var response = await Product.find({ category: category });
            res.json(response)
        }
    }

    async getBrandsWithCate(req,res,next) {
        let category = req.query.category;
        if(!category) {
            res.json({sucess: false, message: "Can't find data search"})
        }
        else {
            var response = await Product.find({ category: category });
            const listBrand = [{category: category},{brands: []}]
            response.forEach(item => {
                if(!listBrand[1].brands.includes(item.brand))
                    listBrand[1].brands.push(item.brand);
            })
            res.send(listBrand)
        }       
    }
}

module.exports = new ProductController;