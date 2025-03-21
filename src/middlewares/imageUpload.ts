import multer from "multer";

export default multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image');