const express = require('express');
const app = express()
const port = 4000
const connectDB = require("./src/db");
const route = require("./src/routes");
var bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const dotenv = require('dotenv')
const cors = require("cors");


dotenv.config()


// middle ware pass to the request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//apply middleware cors
app.use(cors());

app.use(express.static('public/uploads'))
app.use('/api/image', express.static('public/uploads'))

// router
route(app);

//connect db
connectDB();



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})