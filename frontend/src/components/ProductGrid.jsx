import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function ProductGrid(props) {
  const { _id, name, price, images, rating, numReviews } = props.product

  return (
    <Link
      to={`/product/${_id}`}
      className="group flex flex-col w-full bg-[#0A0A0A] border border-zinc-900 overflow-hidden transition-all duration-500 hover:border-orange-500/50">
      {/* Image Container with Hover Zoom Effect */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        {images && images.length > 0 && (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
          />
        )}

        {/* Subtle Overlay Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick View Tag (Visual only) */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white text-black px-3 py-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            View Product
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col">
        {/* Name - Truncated to maintain grid alignment */}
        <h3 className="text-white font-bold uppercase tracking-tighter text-lg leading-tight truncate group-hover:text-orange-500 transition-colors">
          {name}
        </h3>

        {/* Brand/Category Subtext (Optional/Visual) */}
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold mt-1">
          Evanox Exclusive Collection
        </p>

        <div className="flex items-center justify-between mt-6">
          {/* Price with Custom Currency Look */}
          <div className="flex flex-col">
            <span className="text-orange-500 font-black text-xl leading-none">
              {price} <span className="text-[10px] ml-0.5 text-zinc-400 font-medium">MAD</span>
            </span>
          </div>

          {/* Rating Section */}
          <div className="flex flex-col items-end opacity-60 group-hover:opacity-100 transition-opacity">
            <Rating value={rating} />
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter mt-1">
              {numReviews} Reviews
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductGrid
