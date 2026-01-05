import express from 'express'

import { protect } from '../middleware/authMiddleware.js'

import contactController from '../controller/contactController.js'
const router = express.Router()

router.route('/').post(contactController)

export default router
