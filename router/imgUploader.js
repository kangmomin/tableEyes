const app = require('express').Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images/')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().valueOf() + path.extname(file.originalname))
        },
    }),
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname)
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})

const imgUpload = upload.single('img')

app.post("/image-upload", async (req, res) => {
    imgUpload(req, res, err => {
        if (err) return res.status(400).send(err)
        console.log(err)
        res.status(201).send({
            message: "Image upload successed",
            fileInfo: req.file.path
        })
    })
})

module.exports = app