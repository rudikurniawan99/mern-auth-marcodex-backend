const multer = require('multer')

const fileStorage = multer.diskStorage({
  destionation: (req, file, cb) => {
    cb(null, '/images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname.trim() )
  }
})

module.exports = fileStorage