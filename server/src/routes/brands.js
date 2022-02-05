const express = require("express");
const BrandController = require("../controllers/Brands.controller");
const router = express.Router();


router.get("/",BrandController.index);
router.post("/create",BrandController.create);


module.exports = router;