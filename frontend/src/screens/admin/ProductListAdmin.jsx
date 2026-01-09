import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SquarePen, Trash, Plus, RefreshCw, Database } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsForHomeQuery,
} from '../../slices/productSlice'

function ProductListAdmin() {
  const navigate = useNavigate()

  // 1. Hook Definitions
  const { data: products, isLoading, error, refetch, isFetching } = useGetProductsForHomeQuery()
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  // 2. Action Handlers
  const deleteHandler = (id) => async () => {
    if (window.confirm('PERMANENT DELETION: Are you sure?')) {
      try {
        await deleteProduct(id).unwrap()
        refetch()
        toast.success('Asset Purged')
      } catch (err) {
        toast.error(err?.data?.message || 'Deletion Failed')
      }
    }
  }

  const createProductHandler = async () => {
    try {
      const result = await createProduct().unwrap()
      refetch()
      toast.success('Sample Entry Created')
      navigate(`/admin/product/${result._id}/edit`)
    } catch (err) {
      toast.error(err?.data?.message || 'Creation Failed')
    }
  }

  // 3. Conditional Rendering
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#E5E5E1] flex items-center justify-center font-serif italic text-3xl text-zinc-400">
        Syncing Archive...
      </div>
    )

  return (
    <div className="bg-[#E5E5E1] min-h-screen text-zinc-900 font-sans pb-32">
      <div className="h-32 md:h-44" /> {/* Header Spacer */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* HEADER SECTION - Matches image_ca18d6.jpg styling */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-l-[12px] border-zinc-900 pl-10 mb-20 gap-8">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
              Asset <br />
              <span className="font-serif italic text-zinc-400 normal-case tracking-tight">
                Inventory
              </span>
            </h1>
            <p className="text-zinc-500 uppercase tracking-[0.5em] text-xs font-black">
              Admin Command / 2026 Archive
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full xl:w-auto">
            {/* SYNC/REFRESH BUTTON */}
            <button
              onClick={() => refetch()}
              className="flex-1 xl:flex-none flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-900 font-black uppercase px-8 py-5 text-[10px] tracking-widest hover:bg-zinc-50 transition-all rounded-full shadow-sm">
              <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
              Sync Database
            </button>

            {/* CREATE PRODUCT BUTTON */}
            <button
              onClick={createProductHandler}
              disabled={loadingCreate}
              className="flex-1 xl:flex-none flex items-center justify-center gap-3 bg-zinc-900 text-white font-black uppercase px-8 py-5 text-[10px] tracking-widest hover:bg-zinc-700 transition-all rounded-full shadow-xl disabled:opacity-50">
              <Plus size={18} />
              {loadingCreate ? 'Initializing...' : 'Add Entry'}
            </button>
          </div>
        </div>

        {/* ERROR STATE VIEW */}
        {error && (
          <div className="bg-white p-10 rounded-4xl border border-red-100 text-center mb-10 shadow-lg">
            <p className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-2">
              Connection Error
            </p>
            <p className="text-zinc-400 font-mono text-xs">
              {error?.data?.message || 'Check your MongoDB Atlas whitelist/connection string.'}
            </p>
          </div>
        )}

        {/* DESKTOP TABLE - Matches Archive Verified styling in image_ca2b20.png */}
        <div className="hidden md:block overflow-hidden bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-black">
                <th className="py-8 px-10">Asset_UID</th>
                <th className="py-8 px-10">Identity</th>
                <th className="py-8 px-10">Pricing</th>
                <th className="py-8 px-10">Status</th>
                <th className="py-8 px-10 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-white transition-colors group">
                  <td className="py-8 px-10 font-mono text-[10px] text-zinc-400 group-hover:text-zinc-900">
                    {product._id}
                  </td>
                  <td className="py-8 px-10">
                    <p className="text-lg font-black uppercase tracking-tight text-zinc-900">
                      {product.name}
                    </p>
                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                      {product.brand}
                    </p>
                  </td>
                  <td className="py-8 px-10 font-black text-zinc-900">MAD {product.price}</td>
                  <td className="py-8 px-10">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-full text-zinc-500 italic">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="bg-zinc-900 text-white p-4 rounded-full hover:bg-zinc-700 transition-all shadow-lg">
                        <SquarePen size={18} />
                      </Link>
                      <button
                        onClick={deleteHandler(product._id)}
                        className="bg-white border border-zinc-100 text-red-500 p-4 rounded-full hover:bg-red-50 transition-all">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductListAdmin
