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
  const [images, setImages] = useState([]) // Array for existing images (strings)
  const [selectedFiles, setSelectedFiles] = useState([]) // Array for new File objects
  const [previews, setPreviews] = useState([]) // Array for local blob URLs (previews)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')

  // --- API Hooks ---
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

  // Base URL to point to your backend port
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
  }, [product])

  // --- Handlers ---

  // Capture files and create local previews, but do NOT upload yet
  const fileSelectHandler = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)

    // Generate temporary local URLs so the user can see what they chose
    const localPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews(localPreviews)
  }

  // Remove an image that is already on the server
  const removeExistingImageHandler = (indexToRemove) => {
    const filteredImages = images.filter((_, index) => index !== indexToRemove)
    setImages(filteredImages)
  }

  // Remove a locally selected file before it gets uploaded
  const removePendingImageHandler = (indexToRemove) => {
    URL.revokeObjectURL(previews[indexToRemove]) // Clean up memory
    setPreviews(previews.filter((_, index) => index !== indexToRemove))
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let finalImages = [...images] // Start with the existing images kept by user

    try {
      // 1. If there are new files selected, upload them now
      if (selectedFiles.length > 0) {
        const formData = new FormData()
        selectedFiles.forEach((file) => {
          formData.append('images', file)
        })

        // Call the upload mutation
        const uploadRes = await uploadProductImage(formData).unwrap()
        // uploadRes is the array of paths returned from the Express route
        finalImages = [...finalImages, ...uploadRes]
      }

      // 2. Update the product with the consolidated list of image paths
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

      toast.success('Product and assets updated successfully')
      navigate('/admin/productlistadmin')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="bg-black min-h-screen pb-20 font-montserrat">
      {/* Top Navigation */}
      <div className="pt-6 ml-12">
        <Link
          className="bg-orange-600 text-white px-6 py-2 font-black uppercase tracking-tighter italic hover:bg-orange-500 transition-all inline-block"
          to="/admin/productlistadmin">
          &larr; Return to Inventory
        </Link>
      </div>

      <div className="flex items-center justify-center p-4 mt-4">
        <div className="w-full max-w-4xl bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm shadow-2xl">
          <h1 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter">
            Manifest <span className="text-orange-600">Editor</span>
            {isLoading && (
              <span className="ml-4 animate-pulse text-zinc-500 text-xs normal-case font-normal">
                Retrieving Data...
              </span>
            )}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME & PRICE SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Identify Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
            </div>

            {/* MULTI-IMAGE UPLOAD & VISUAL PREVIEW */}
            <div className="border-t border-b border-zinc-800 py-8 my-6">
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">
                Visual Assets (Staging Area)
              </label>

              <div className="space-y-4">
                <input
                  type="file"
                  multiple
                  onChange={fileSelectHandler}
                  className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-black file:uppercase file:bg-zinc-100 file:text-black hover:file:bg-white cursor-pointer"
                />

                {(loadingUpload || loadingUpdate) && (
                  <p className="text-orange-500 text-[10px] font-bold animate-pulse uppercase tracking-widest">
                    Synchronizing Assets with Central Server...
                  </p>
                )}

                {/* --- IMAGE DISPLAY GRID --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                  {/* Existing Server-side Images */}
                  {images.map((img, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative group bg-black border border-zinc-800 p-2 rounded-sm shadow-lg">
                      <img
                        src={`${baseUrl}${img}`}
                        alt={`Asset ${index}`}
                        className="w-full h-32 object-cover mb-2 grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Asset+Not+Found'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImageHandler(index)}
                        className="text-red-600 text-[9px] font-black hover:text-red-400 uppercase text-left transition-colors">
                        [ Remove Server Asset ]
                      </button>
                    </div>
                  ))}

                  {/* New Locally Staged Images (Pending) */}
                  {previews.map((url, index) => (
                    <div
                      key={`pending-${index}`}
                      className="relative group bg-zinc-900 border border-orange-600/50 p-2 rounded-sm shadow-lg">
                      <img
                        src={url}
                        alt={`Pending ${index}`}
                        className="w-full h-32 object-cover mb-2"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-orange-600 text-[8px] font-black uppercase">
                          ● Pending Upload
                        </span>
                        <button
                          type="button"
                          onClick={() => removePendingImageHandler(index)}
                          className="text-zinc-500 text-[9px] font-black hover:text-white uppercase text-left transition-colors">
                          [ Cancel Selection ]
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BRAND & CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
            </div>

            {/* STOCK & DESCRIPTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Inventory Count
                </label>
                <input
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Technical Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold min-h-[120px]"
                />
              </div>
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 rounded-sm font-bold uppercase tracking-tight text-center">
                Error: {error?.data?.message || error.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loadingUpdate || loadingUpload}
              className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all disabled:opacity-50 mt-4 shadow-xl">
              {loadingUpdate || loadingUpload ? 'Processing...' : 'Update Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProductScreen
