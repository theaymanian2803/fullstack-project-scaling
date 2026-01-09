import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
})

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    artist_name: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    instock: { type: String },
    countInStock: { type: Number, required: true, default: 0 },

    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

    description: { type: String },
    images: [{ type: String }],
    whatsInside: [{ type: String }],
    perfectFor: { type: String },
    format: { type: String },
    license: { type: String },

    otherFeatures: [
      {
        title: { type: String },
        text: { type: String },
        icon: { type: String },
      },
    ],

    lifetimeAccess: {
      title: { type: String },
      text: { type: String },
    },

    programCompatibility: {
      title: { type: String },
      text: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
