import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Plus, Minus, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Rating from './../components/Rating'
import { addToCart } from './../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  useGetProductDetailsQuery,
  useGetProductsForHomeQuery,
  useCreateReviewMutation,
} from './../slices/productSlice'
import { toast } from 'react-toastify'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Data Queries & Mutations
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id)
  const { data: allProducts } = useGetProductsForHomeQuery()
  const [createReview, { isLoading: loadingReview }] = useCreateReviewMutation()

  // Redux State
  const { userInfo } = useSelector((state) => state.auth)

  // Component State
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeAccordion, setActiveAccordion] = useState('description')

  // Review Form State
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    setQty(1)
    setSelectedSize('')
    window.scrollTo(0, 0)
  }, [id])

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  const addToCartHandler = () => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }
    dispatch(addToCart({ ...product, qty, size: selectedSize }))
    navigate('/cart')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!rating || !comment) {
      toast.error('Please provide a rating and comment')
      return
    }
    try {
      await createReview({ productId: id, rating, comment }).unwrap()
      refetch()
      toast.success('Review submitted for moderation')
      setRating(0)
      setComment('')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  // Related Product Logic
  const wearItWith = allProducts
    ?.filter((p) => p._id !== id && p.category === product?.category)
    .slice(0, 4)
  const relatedProducts = allProducts?.filter((p) => p._id !== id).slice(0, 4)

  // Lightbox Navigation
  const nextImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev + 1) % product.images.length)
  }
  const prevImage = (e) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-serif italic text-zinc-400">
        Loading Collection...
      </div>
    )
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 uppercase tracking-widest">
        Error // {error?.data?.message}
      </div>
    )

  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-zinc-100 relative">
      {/* --- LIGHTBOX OVERLAY --- */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[110] bg-white/98 backdrop-blur-md flex items-center justify-center transition-all duration-500"
          onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-8 right-10 text-zinc-400 hover:text-black transition-colors z-[110]">
            <X size={32} strokeWidth={1} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-12 p-4 text-zinc-300 hover:text-black transition-colors z-[110]">
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          <div className="relative w-[90vw] md:w-auto h-[70vh] md:h-[80vh] aspect-3/4 bg-zinc-50 shadow-sm overflow-hidden">
            <img
              src={product.images[lightboxIndex]}
              alt="Full view"
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
            />
          </div>
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-12 p-4 text-zinc-300 hover:text-black transition-colors z-[110]">
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <nav className="py-8 text-[10px] uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-zinc-200">/</span>
          <span className="text-zinc-900 font-semibold">{product.category}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:w-[62%] space-y-8">
            {product.images?.map((img, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 overflow-hidden cursor-zoom-in group"
                onClick={() => setLightboxIndex(idx)}>
                <img
                  src={img}
                  alt={`${product.name} view ${idx}`}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
                />
              </div>
            ))}
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="lg:w-[38%]">
            <div className="lg:sticky lg:top-12 space-y-10 pb-20">
              <header className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                  {product.brand || 'Original Edition'}
                </p>
                <h1 className="text-4xl xl:text-5xl font-serif text-zinc-800 leading-[1.15] tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
                  <span className="text-2xl font-light text-zinc-600">${product.price}.00</span>
                  <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                </div>
              </header>

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] uppercase font-bold tracking-widest">
                      Size:{' '}
                      <span className="font-normal text-zinc-400 ml-2">
                        {selectedSize || 'Select Selection'}
                      </span>
                    </label>
                    <button className="text-[10px] underline uppercase tracking-[0.2em] text-zinc-400 hover:text-black">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 text-xs transition-all duration-300 border ${
                          selectedSize === size
                            ? 'border-black bg-black text-white shadow-md'
                            : 'border-zinc-100 hover:border-zinc-400 text-zinc-600'
                        }`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="w-full py-5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all active:scale-[0.99] disabled:bg-zinc-50 disabled:text-zinc-300">
                  {product.countInStock > 0 ? 'Add to Bag' : 'Sold Out'}
                </button>
              </div>

              {/* ACCORDIONS */}
              <div className="border-t border-zinc-100 pt-2">
                <div className="border-b border-zinc-100">
                  <button
                    onClick={() => toggleAccordion('description')}
                    className="w-full py-6 flex justify-between items-center group">
                    <h3 className="text-sm font-serif italic">Description</h3>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        activeAccordion === 'description' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeAccordion === 'description' ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}>
                    <p className="text-[13px] text-zinc-500 leading-relaxed font-light">
                      {product.description || 'Description not available'}
                    </p>
                  </div>
                </div>
              </div>

              {/* WEAR IT WITH */}
              {wearItWith?.length > 0 && (
                <div className="pt-8">
                  <h2 className="text-[13px] uppercase tracking-widest font-bold mb-8 border-l-2 border-black pl-4">
                    Wear It With
                  </h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                    {wearItWith.map((item) => (
                      <Link key={item._id} to={`/product/${item._id}`} className="group space-y-3">
                        <div className="relative aspect-3/4 bg-zinc-50 overflow-hidden">
                          <img
                            src={item.images?.[0] || item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[10px] uppercase font-bold truncate tracking-tight text-zinc-800">
                            {item.name}
                          </h4>
                          <p className="text-[10px] font-light text-zinc-500">${item.price}.00</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- REVIEWS SECTION (MODIFIED FOR MODERATION) --- */}
        <div className="mt-32 pt-24 border-t border-zinc-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-serif italic text-zinc-800 mb-12">Reviews</h2>

              {/* Check if there are any APPROVED reviews */}
              {product.reviews.filter((r) => r.isApproved).length === 0 && (
                <p className="text-zinc-400 font-serif italic">No reviews yet for this piece.</p>
              )}

              <div className="space-y-12">
                {/* FILTER: Only map through reviews where isApproved is true */}
                {product.reviews
                  .filter((review) => review.isApproved === true)
                  .map((review) => (
                    <div key={review._id} className="pb-8 border-b border-zinc-50 space-y-3">
                      <div className="flex justify-between items-center">
                        <strong className="text-[11px] uppercase tracking-widest">
                          {review.name}
                        </strong>
                        <span className="text-[10px] text-zinc-400">
                          {review.createdAt?.substring(0, 10) || 'Just now'}
                        </span>
                      </div>
                      <Rating value={review.rating} />
                      <p className="text-sm text-zinc-600 font-light leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-zinc-50 p-10">
              <h3 className="text-lg font-serif italic mb-6">Write a Review</h3>
              {userInfo ? (
                <form onSubmit={submitHandler} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-3">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-white border border-zinc-200 p-4 text-xs outline-none focus:border-black transition-colors">
                      <option value="">Select Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-3">
                      Comment
                    </label>
                    <textarea
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white border border-zinc-200 p-4 text-xs outline-none focus:border-black transition-colors"
                      placeholder="Share your thoughts..."></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingReview}
                    className="px-10 py-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                    {loadingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <p className="text-[9px] text-zinc-400 uppercase tracking-tighter">
                    * All reviews are moderated before appearing on the site.
                  </p>
                </form>
              ) : (
                <p className="text-xs text-zinc-500 tracking-wide uppercase">
                  Please{' '}
                  <Link to="/login" className="font-bold underline text-black">
                    sign in
                  </Link>{' '}
                  to write a review.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: RELATED COLLECTION */}
        {relatedProducts?.length > 0 && (
          <section className="mt-32 pt-24 border-t border-zinc-100 pb-24">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl font-serif italic text-zinc-800">You May Also Like</h2>
              <Link
                to="/store"
                className="text-[10px] uppercase font-bold tracking-[0.3em] border-b border-black pb-1 flex items-center gap-3 hover:pr-4 transition-all">
                The Gallery <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {relatedProducts.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`} className="group block">
                  <div className="relative aspect-3/4 bg-zinc-50 mb-6 overflow-hidden">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-1000"
                    />
                  </div>
                  <h4 className="text-xs uppercase tracking-widest text-zinc-800 group-hover:underline decoration-zinc-300 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-sm font-light text-zinc-500">${item.price}.00</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Product
