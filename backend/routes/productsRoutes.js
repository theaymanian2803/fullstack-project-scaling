import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getHomeProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controller/productController.js'
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/home').get(getHomeProducts)
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

router.route('/:id/reviews').post(protect, createProductReview)

export default router
