const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '../public/logos'))
    }, 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
        cb(null, file.fieldname + '.' + uniqueSuffix + path.extname(file.originalname))
    }
}) 

const fileFilter = (req, file, cb) => {
    const supportedTypes = /\.(jpeg|jpg|png)$/i
    const extname = supportedTypes.test(
        path.extname(file.originalname).toLowerCase()
    )  

    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"]
    
    const mimeType = allowedMimeTypes.includes(file.mimetype);

    if(extname && mimeType){
        cb(null, true)
    }
    else{
        cb(new Error("Images allowed are .jpeg, .jpg, and .png only"))
    }
}

module.exports = multer({ storage, fileFilter })