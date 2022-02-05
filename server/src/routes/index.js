const productsRouter = require("./products"); 
const ordersRouter = require('./orders');
const catesRouter = require("./cates");
const brandsRouter = require("./brands");

function route(app) {
    // product api 
    app.use("/api/products",productsRouter)
    // order api
    app.use("/api/orders",ordersRouter)
    //cate api
    app.use("/api/categorys",catesRouter)
    // brand api
    app.use("/api/brands", brandsRouter)
}

module.exports = route;