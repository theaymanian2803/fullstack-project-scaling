import React, { useEffect } from 'react'
import { useGetProductsForHomeQuery } from '../../slices/productSlice'
import { useApproveReviewMutation } from '../../slices/reviewSlice'
import { toast } from 'react-toastify'
import { RefreshCcw, CheckCircle, Clock, MessageSquare, ShieldCheck } from 'lucide-react'

function ReviewsListAdmin() {
  const { data: products, isLoading, error, refetch } = useGetProductsForHomeQuery()
  const [approveReview, { isLoading: isUpdating }] = useApproveReviewMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleApprove = async (productId, reviewId) => {
    try {
      await approveReview({ productId, reviewId }).unwrap()
      toast.success('Archive Updated: Review Approved')
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#E5E5E1] flex items-center justify-center font-serif italic text-3xl text-zinc-400">
        Accessing Review Archive...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-[#E5E5E1] flex items-center justify-center p-10">
        <div className="text-center bg-white p-16 rounded-[4rem] shadow-2xl border border-white">
          <p className="text-red-500 uppercase tracking-[0.5em] text-sm font-black mb-6">
            System Error // Data Breach
          </p>
          <p className="text-zinc-400 font-mono text-xs">{error.message}</p>
        </div>
      </div>
    )

  return (
    <div className="bg-[#E5E5E1] min-h-screen text-zinc-900 font-sans selection:bg-zinc-200">
      {/* 1. FIXED: SPACER FOR NAVBAR CLEARANCE */}
      <div className="h-32 md:h-48" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32">
        {/* 2. ENLARGED HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-l-[12px] border-zinc-900 pl-12 mb-24 gap-10">
          <div>
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
              Review <br />
              <span className="font-serif italic text-zinc-400 normal-case tracking-tight">
                Moderation
              </span>
            </h2>
            <p className="text-zinc-500 uppercase tracking-[0.6em] text-base font-black">
              Admin Terminal / Audit Protocol 2026
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="flex items-center gap-4 px-10 py-5 bg-white rounded-full text-xs font-black uppercase tracking-[0.2em] border-2 border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all duration-700 shadow-xl hover:-translate-y-1">
            <RefreshCcw size={18} className={isUpdating ? 'animate-spin' : ''} />
            Sync Database
          </button>
        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-10">
          {products?.map((product) => (
            <React.Fragment key={product._id}>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="group bg-white/50 backdrop-blur-xl border border-white rounded-[4rem] p-12 md:p-20 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:bg-white/80">
                  <div className="flex flex-col xl:flex-row justify-between gap-16">
                    <div className="space-y-10 flex-1">
                      {/* STATUS LABELS */}
                      <div className="flex flex-wrap items-center gap-6">
                        <span className="text-xs uppercase tracking-[0.3em] bg-zinc-900 text-white px-7 py-3 font-black rounded-full shadow-lg">
                          Product: {product.name}
                        </span>

                        {review.isApproved ? (
                          <span className="flex items-center gap-3 text-xs font-black text-emerald-600 tracking-widest uppercase bg-emerald-50/50 px-7 py-3 rounded-full border border-emerald-100">
                            <CheckCircle size={16} /> Approved
                          </span>
                        ) : (
                          <span className="flex items-center gap-3 text-xs font-black text-amber-600 tracking-widest uppercase bg-amber-50/50 px-7 py-3 rounded-full border border-amber-100 animate-pulse">
                            <Clock size={16} /> Pending Audit
                          </span>
                        )}
                      </div>

                      {/* REVIEWER IDENTITY */}
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-black">
                          Reviewer Identity
                        </p>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900">
                          {review.name}
                        </h3>
                      </div>

                      {/* LARGE SERIF COMMENT */}
                      <div className="relative pt-4">
                        <MessageSquare className="absolute -left-12 -top-8 text-zinc-200/50 w-24 h-24 -z-10" />
                        <p className="text-3xl md:text-5xl text-zinc-700 font-serif italic leading-[1.1] max-w-5xl">
                          "{review.comment}"
                        </p>
                      </div>
                    </div>

                    {/* ACTION & VERIFICATION SECTION */}
                    <div className="flex flex-col justify-start items-end min-w-[280px]">
                      {!review.isApproved ? (
                        <button
                          onClick={() => handleApprove(product._id, review._id)}
                          disabled={isUpdating}
                          className="w-full bg-zinc-900 text-white px-12 py-7 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-zinc-700 hover:-translate-y-2 transition-all duration-500 shadow-2xl disabled:opacity-20 active:scale-95">
                          {isUpdating ? 'Verifying...' : 'Authorize Review'}
                        </button>
                      ) : (
                        /* 3. FIXED: ARCHIVE ENTRY VERIFIED VISIBILITY */
                        <div className="flex items-center gap-3 px-10 py-5 bg-zinc-100 border-2 border-zinc-200/50 rounded-full shadow-inner">
                          <ShieldCheck size={16} className="text-zinc-400" />
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">
                            Archive Entry Verified
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}

          {/* EMPTY STATE */}
          {products?.every((p) => p.reviews.length === 0) && (
            <div className="py-60 text-center bg-white/30 rounded-[5rem] border-4 border-dashed border-zinc-200">
              <p className="font-serif italic text-5xl text-zinc-400">
                The feedback archive is currently empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewsListAdmin
