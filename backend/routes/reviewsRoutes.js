import express from 'express'
const router = express.Router()
import { approveReview } from '../controller/reviewController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Match this with your REVIEWS_URL constant
router.route('/approve').put(protect, admin, approveReview)

export default router
