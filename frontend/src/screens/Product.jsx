import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Zap, ShieldCheck, Clock } from 'lucide-react'
import Rating from './../components/Rating'
import { addToCart } from './../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductDetailsQuery, useCreateReviewMutation } from './../slices/productSlice'
import { toast } from 'react-toastify'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Queries & Mutations
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id)
  const [createReview, { isLoading: reviewIsLoading }] = useCreateReviewMutation()

  // Component State
  const [currentImage, setCurrentImage] = useState(null)
  const [isLightboxOpen, setIsLightBoxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  // Sync current image when product loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setCurrentImage(product.images[0])
    }
  }, [product])

  // Reset Qty when ID changes
  useEffect(() => {
    setQty(1)
  }, [id])

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const reviewHandlerSubmit = async (e) => {
    e.preventDefault()
    try {
      await createReview({ productId: id, rating, comment }).unwrap()
      refetch()
      setRating(5)
      setComment('')
      toast.success('REVIEW_LOGGED_SUCCESSFULLY')
    } catch (err) {
      toast.error(err?.data?.message || 'SUBMISSION_FAILED')
    }
  }

  const openLightBox = (imgSrc) => {
    const index = product.images.indexOf(imgSrc)
    setLightboxImageIndex(index !== -1 ? index : 0)
    setIsLightBoxOpen(true)
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white font-black text-4xl italic animate-pulse tracking-widest">
          LOADING_SYSTEM...
        </h1>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-orange-600 font-black text-2xl uppercase">
          ERROR // {error?.data?.message || 'FETCH_FAILED'}
        </h1>
      </div>
    )

  return (
    <div className="min-h-screen bg-black text-white font-medium pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* BREADCRUMB */}
        <div className="py-8 text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
          <Link to="/" className="hover:text-white transition">
            HOME
          </Link>
          <span className="mx-4 text-zinc-800">//</span>
          <span className="text-orange-600 italic uppercase">
            EXCLUSIVE DESIGN FAST LANE Collection – Built for Speed, Not Excuses
          </span>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: IMAGES & SPECS */}
          <div className="space-y-10">
            <div
              className="bg-zinc-900 border-2 border-zinc-900 cursor-crosshair group relative overflow-hidden"
              onClick={() => openLightBox(currentImage)}>
              <div className="absolute inset-0 bg-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <span className="text-white font-black uppercase tracking-tighter text-sm border-2 border-white px-4 py-2">
                  Expand_View
                </span>
              </div>
              <img
                src={currentImage}
                alt="Product"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumbnail"
                  className={`w-24 h-24 object-cover cursor-pointer border-2 transition-all ${
                    currentImage === img
                      ? 'border-orange-600 scale-95'
                      : 'border-zinc-800 opacity-50 hover:opacity-100'
                  }`}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-zinc-900">
              {product.otherFeatures?.map((f, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-black uppercase italic text-orange-600 flex items-center gap-2">
                    <Zap size={16} /> {f.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed uppercase">{f.text}</p>
                </div>
              ))}
            </div>

            {/* ADDITIONAL META */}
            <div className="grid grid-cols-2 gap-7 border-t border-zinc-900 pt-10">
              <div>
                <h3 className="text-lg font-bold mb-1 uppercase tracking-widest text-orange-600">
                  {product?.lifetimeAccess?.title}
                </h3>
                <p className="text-zinc-500 text-sm">{product?.lifetimeAccess?.text}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 uppercase tracking-widest text-orange-600">
                  {product?.programCompatibility?.title}
                </h3>
                <p
                  className="text-zinc-500 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: product?.programCompatibility?.text?.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong>$1</strong>'
                    ),
                  }}></p>
              </div>
            </div>
          </div>

          {/* RIGHT: BUY ACTIONS & DETAILS */}
          <div className="space-y-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic ">
                {product.name}
              </h1>
              <div className="flex items-center gap-8 border-y border-zinc-900 py-6">
                <span className="text-4xl font-black text-orange-600 italic tracking-tighter">
                  ${product.price}
                </span>
                <Rating value={product.rating} text={`${product.numReviews || 0} REVIEWS`} />
              </div>
            </div>

            <div className="bg-zinc-900/30 p-8 border border-zinc-900 space-y-8">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="text-zinc-500">SYSTEM_STATUS</span>
                <span className={product.countInStock > 0 ? 'text-emerald-500' : 'text-red-600'}>
                  {product.countInStock > 0 ? 'IN_STOCK' : 'DEPLETED'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-zinc-600">
                    QUANTITY_SELECT
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-800 p-4 text-white font-black outline-none focus:border-orange-600 appearance-none">
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full py-6 bg-white text-black font-black text-xl uppercase tracking-tighter hover:bg-orange-600 hover:text-white transition-all duration-300 disabled:bg-zinc-800">
                add to cart
              </button>
            </div>

            {/* PRODUCT METADATA */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-4">
                  // Description
                </h2>
                <p className="text-zinc-400 text-lg font-medium leading-relaxed uppercase italic">
                  {product.description}
                </p>
              </section>
              <section className="grid grid-cols-2 gap-6 border-t border-zinc-900 pt-6">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                    Format
                  </h3>
                  <p className="text-white font-black uppercase italic">{product.format}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                    License
                  </h3>
                  <p className="text-white font-black uppercase italic">{product.license}</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-40 border-t-2 border-zinc-900 pt-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-16">
            USER_<span className="text-orange-600">reviews</span>
          </h2>
          {/* ... existing review mapping logic ... */}
        </div>
      </div>

      {/* LIGHTBOX MODAL - FIXED DIMENSIONS REDESIGN */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[999] flex items-center justify-center p-4 transition-all duration-500"
          onClick={() => setIsLightBoxOpen(false)}>
          {/* Close Button */}
          <button
            onClick={() => setIsLightBoxOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-orange-600 transition-all hover:rotate-90 z-20 bg-black/50 p-2 rounded-full border border-white/10">
            <X size={32} strokeWidth={3} />
          </button>

          {/* Controls UI */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-12 pointer-events-none z-10">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
              }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-black/50 hover:bg-orange-600 text-white flex items-center justify-center transition-all border border-white/10 group">
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
              }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-black/50 hover:bg-orange-600 text-white flex items-center justify-center transition-all border border-white/10 group">
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Frame with Fixed Dimensions */}
          <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Tech Accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-orange-600"></div>
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-orange-600"></div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-orange-600"></div>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-orange-600"></div>

            {/* FIXED ASPECT RATIO CONTAINER */}
            <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <img
                key={lightboxImageIndex} // Key forces animation re-trigger on change
                src={product.images[lightboxImageIndex]}
                alt="fullview"
                className="w-[90vw] h-[60vh] md:w-[800px] md:h-[600px] object-cover animate-in fade-in zoom-in-95 duration-500"
              />
            </div>

            {/* Info Strip */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
