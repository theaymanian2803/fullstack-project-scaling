import React from 'react'
import { Link } from 'react-router-dom'
import { SquarePen, Trash, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsForHomeQuery,
} from '../../slices/productSlice'

function ProductListAdmin() {
  // 1. Hook Definitions
  const { data: products, isLoading, error, refetch } = useGetProductsForHomeQuery()
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  // 2. Action Handlers
  const deleteHandler = (id) => async (e) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap()
        refetch()
        toast.success('Product deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.message || 'Failed to delete product')
      }
    }
  }

  const createProductHandler = async () => {
    try {
      await createProduct().unwrap()
      refetch()
      toast.success('New product initialized')
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Failed to create product')
    }
  }

  // 3. Conditional Loading/Error States
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white font-black animate-pulse uppercase tracking-tighter text-2xl italic">
          Loading Assets...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 rounded-sm font-bold uppercase tracking-tight text-center">
          Error: {error?.data?.message || error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loadingDelete && 'Deleting...'}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
              Product <span className="text-orange-600">Inventory</span>
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2 font-bold">
              Management / Central Command
            </p>
          </div>
          <button
            onClick={createProductHandler}
            disabled={loadingCreate}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase px-6 py-3 tracking-tighter transition-all duration-200 rounded-sm disabled:opacity-50">
            <Plus size={20} />
            {loadingCreate ? 'Processing...' : 'Create Product'}
          </button>
        </div>

        {/* --- MOBILE VIEW (Visible only on small screens) --- */}
        <div className="block md:hidden space-y-4">
          {products?.map((product) => (
            <div key={product._id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-blue-400 font-mono text-[10px] mt-1">{product._id}</p>
                </div>
                <p className="text-orange-500 font-black text-xl">${product.price}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs uppercase font-bold tracking-widest text-zinc-500 mb-6">
                <div>
                  <span className="block text-[10px] text-zinc-600 mb-1">Category</span>
                  <span className="text-white">{product.category}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-600 mb-1">Brand</span>
                  <span className="text-white">{product.brand}</span>
                </div>
              </div>

              <div className="flex gap-2 border-t border-zinc-800 pt-4">
                {/* Fixed SquarePen Link */}
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 p-3 flex justify-center transition-colors rounded-sm">
                  <SquarePen size={18} />
                </Link>

                {/* Fixed Edit Details Link */}
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="flex-2 bg-zinc-100 text-black text-center font-black py-3 text-xs tracking-widest hover:bg-white transition-colors uppercase rounded-sm">
                  Edit Details
                </Link>

                {/* Trash Button */}
                <button
                  onClick={deleteHandler(product._id)}
                  className="flex-1 bg-red-900/20 text-red-500 border border-red-900/50 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all rounded-sm">
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP VIEW (Visible only on medium screens and up) --- */}
        <div className="hidden md:block overflow-hidden bg-zinc-900/30 border border-zinc-800 rounded-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-300 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="py-5 px-6">ID</th>
                <th className="py-5 px-6">Product Name</th>
                <th className="py-5 px-6">Price</th>
                <th className="py-5 px-6">Category</th>
                <th className="py-5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="py-5 px-6 font-mono text-[11px] text-zinc-500 group-hover:text-blue-400 transition-colors">
                    {product._id.substring(0, 12)}...
                  </td>
                  <td className="py-5 px-6 text-sm font-bold uppercase tracking-tight">
                    {product.name}
                  </td>
                  <td className="py-5 px-6 text-sm font-black text-orange-500">${product.price}</td>
                  <td className="py-5 px-6 text-xs font-bold text-zinc-400 italic">
                    {product.category}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center items-center gap-3">
                      {/* FIX 1: Edit Icon (Link Only) */}
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-zinc-500 hover:text-white transition-colors">
                        <SquarePen size={19} />
                      </Link>

                      {/* FIX 2: Details Link (Link Only - Removed onClick) */}
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black px-4 py-2 tracking-tighter transition-all rounded-sm">
                        DETAILS
                      </Link>

                      {/* FIX 3: Delete Button (Action Only) */}
                      <button
                        type="button"
                        onClick={deleteHandler(product._id)}
                        className="text-zinc-500 hover:text-red-500 transition-colors">
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
