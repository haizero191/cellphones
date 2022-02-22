const express = require("express");
const router = express.Router();
const OrderController  = require('../controllers/Orders.controller')


//[GET] api/orders/
router.get('/', OrderController.index)

//[POST]  api/orders/create
router.post('/create', OrderController.create)

//[POST]  api/orders/remove
router.post('/remove', OrderController.remove)


//[POST]  api/orders/changeStatusOrder
router.post('/changestatusorder', OrderController.changeStatusOrder);


module.exports = router;