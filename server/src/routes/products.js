const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/Products.controller");

//[GET] api/products/
router.get("/",ProductController.index);

//[POST] api/products/create
router.post("/create",store.array("image", 12),ProductController.add);

//[POST] api/products/remove
router.post("/remove", ProductController.remove);

//[POST] api/products/edit
router.post("/edit",store.array("image", 12), ProductController.edit);


//[GET] api/products/search
router.get("/search", ProductController.filter);

//[GET] api/products/brand
router.get("/brands", ProductController.getBrandsWithCate);

//[GET] api/products/show
router.get("/show", ProductController.show);


module.exports = router;