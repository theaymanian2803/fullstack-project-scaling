import asyncHandler from '../middleware/asyncHandler.js'
import Product from './../models/productModel.js'

// @desc    Approve a product review
// @route   PUT /api/reviews/approve
// @access  Private/Admin
const approveReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.body
  const product = await Product.findById(productId)

  if (product) {
    const review = product.reviews.find((r) => r._id.toString() === reviewId)

    if (review) {
      review.isApproved = true

      // Recalculate stars ONLY for approved reviews
      const approvedReviews = product.reviews.filter((r) => r.isApproved === true)
      product.numReviews = approvedReviews.length
      product.rating =
        approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length

      await product.save()
      res.status(200).json({ message: 'Review approved successfully' })
    } else {
      res.status(404)
      throw new Error('Review not found')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export { approveReview }
