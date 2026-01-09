import asyncHandler from '../middleware/asyncHandler.js'
import Product from './../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const pagesize = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pagesize)
    .skip(pagesize * (page - 1))
  return res.json({ products, page, pages: Math.ceil(count / pagesize) })
})
const getHomeProducts = asyncHandler(async (req, res) => {
  // We do NOT filter here. The Admin needs to see everything to approve it.
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch single product (Public View)
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const productObj = product.toObject()
    // Only show approved reviews on the product page
    productObj.reviews = productObj.reviews.filter((review) => review.isApproved === true)
    return res.json(productObj)
  }

  return res.status(404).json({ message: 'Product not found' })
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    artist_name: 'Sample Artist', // NEW: Required by your model
    price: 10,
    user: req.user._id,
    images: ['/images/1.png'], // FIXED: Must be an array []
    brand: 'Sample brand test 2',
    category: 'Sample category',
    instock: 'In Stock', // NEW: Required by your model as a String
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, images, brand, category, countInStock, instock, artist_name } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.images = images
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.instock = instock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
// @desc    Create new review
// @route   POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      isApproved: false, // Starts as false
    }

    product.reviews.push(review)
    // We do NOT update product.rating or numReviews here yet.
    // They only update when 'isApproved' becomes true.

    await product.save()
    res.status(201).json({ message: 'Review submitted for moderation' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getHomeProducts,
}
