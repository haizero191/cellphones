const multer = require("multer");


// Set storage
var storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        // image.jpg
        var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})

store = multer({storage: storage})


module.exports = store;