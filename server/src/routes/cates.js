const express = require("express");
const CategoryController = require("../controllers/Categorys.controller");
const router = express.Router();


router.get("/",CategoryController.index);
router.post("/create",CategoryController.create);


module.exports = router;