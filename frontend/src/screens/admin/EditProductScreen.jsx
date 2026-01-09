import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productSlice'

function EditProductScreen() {
  const { id: productId } = useParams()
  const navigate = useNavigate()

  // --- State Configuration ---
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  // --- API Hooks ---
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

  const baseUrl = 'http://localhost:5000'

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImages(product.images || [])
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
    return () => previews.forEach((url) => URL.revokeObjectURL(url))
  }, [product, previews])

  // --- Handlers ---
  const fileSelectHandler = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])
    const localPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...localPreviews])
  }

  const removeExistingImageHandler = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove))
  }

  const removePendingImageHandler = (indexToRemove) => {
    URL.revokeObjectURL(previews[indexToRemove])
    setPreviews(previews.filter((_, index) => index !== indexToRemove))
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let finalImages = [...images]

    try {
      if (selectedFiles.length > 0) {
        const formData = new FormData()
        selectedFiles.forEach((file) => formData.append('images', file))
        const uploadRes = await uploadProductImage(formData).unwrap()
        finalImages = [...finalImages, ...uploadRes]
      }

      await updateProduct({
        productId,
        name,
        price,
        images: finalImages,
        brand,
        category,
        countInStock,
        description,
      }).unwrap()

      toast.success('Asset Manifest Updated')
      navigate('/admin/productlistadmin')
    } catch (err) {
      toast.error(err?.data?.message || 'Update Protocol Failed')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E5E5E1] flex items-center justify-center font-serif italic text-4xl text-zinc-400 animate-pulse">
        Syncing Archive...
      </div>
    )
  }

  return (
    <div className="bg-[#E5E5E1] min-h-screen pb-40 font-sans selection:bg-zinc-200">
      <div className="pt-24 max-w-[1300px] mx-auto px-8">
        <Link
          className="text-zinc-400 hover:text-zinc-900 font-black uppercase tracking-[0.4em] text-xs flex items-center gap-3 transition-all mb-16"
          to="/admin/productlistadmin">
          <span className="text-xl">&larr;</span> Return to Central Inventory
        </Link>

        <div className="bg-white rounded-[4rem] shadow-2xl p-12 md:p-20 border border-white">
          <header className="border-l-[12px] border-zinc-900 pl-10 mb-20">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Edit{' '}
              <span className="font-serif italic text-zinc-300 normal-case tracking-tight">
                Asset
              </span>
            </h1>
            <p className="text-zinc-400 font-mono text-xs uppercase tracking-[0.5em]">
              Global Registry ID: {productId}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* NAME & PRICE SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Identify Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Valuation (MAD)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* BRAND & CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Manufacturer / Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Classification
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* STOCK & DESCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Inventory Status (Count)
                </label>
                <input
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 ml-2">
                  Technical Brief
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-transparent rounded-3xl px-8 py-6 text-xl font-bold text-zinc-900 focus:border-zinc-100 focus:bg-white outline-none transition-all min-h-[180px] shadow-sm"
                />
              </div>
            </div>

            {/* IMAGE STAGING AREA */}
            <div className="bg-zinc-50 p-12 rounded-[3.5rem] border-2 border-dashed border-zinc-200">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 block">
                    Visual Gallery Protocol
                  </label>
                  <p className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest">
                    Multiple selection enabled
                  </p>
                </div>

                {/* LARGER FILE BUTTON */}
                <input
                  type="file"
                  multiple
                  onChange={fileSelectHandler}
                  className="block w-full max-w-md text-sm text-zinc-500
                    file:mr-8 file:py-4 file:px-10
                    file:rounded-full file:border-0
                    file:text-xs file:font-black
                    file:uppercase file:tracking-widest
                    file:bg-zinc-900 file:text-white
                    hover:file:bg-zinc-700 file:transition-all
                    cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Existing Images */}
                {images.map((img, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative aspect-square rounded-[2rem] overflow-hidden group bg-white border border-zinc-100 shadow-md">
                    <img
                      src={img.startsWith('http') ? img : `${baseUrl}${img}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImageHandler(index)}
                      className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center backdrop-blur-sm">
                      Delete Asset
                    </button>
                  </div>
                ))}

                {/* Local Previews */}
                {previews.map((url, index) => (
                  <div
                    key={`pending-${index}`}
                    className="relative aspect-square rounded-[2rem] overflow-hidden bg-zinc-900 border-4 border-zinc-900 shadow-2xl group animate-in fade-in zoom-in duration-300">
                    <img
                      src={url}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-4 left-4 bg-white text-zinc-900 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      Staged
                    </div>
                    <button
                      type="button"
                      onClick={() => removePendingImageHandler(index)}
                      className="absolute bottom-4 right-4 bg-white text-zinc-900 w-12 h-12 rounded-full text-xl font-light shadow-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 p-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] text-center shadow-inner">
                Protocol Error: {error?.data?.message || error.message}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loadingUpdate || loadingUpload}
              className="w-full bg-zinc-900 text-white py-10 rounded-full font-black uppercase tracking-[0.5em] text-sm hover:bg-zinc-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
              {loadingUpdate || loadingUpload
                ? 'Synchronizing Archive...'
                : 'Commit Changes to Manifest'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProductScreen
