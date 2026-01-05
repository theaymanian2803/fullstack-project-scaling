import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Ensure this folder exists in your root
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images only!'), false)
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// Route for multiple uploads
router.post('/', upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded' })
  }

  // Map files to paths usable by the browser
  const filePaths = req.files.map((file) => `/${file.path.replace(/\\/g, '/')}`)
  res.send(filePaths)
})

export default router
