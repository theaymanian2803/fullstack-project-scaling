import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Grid from './../components/Grid'
import { useGetProductsQuery } from './../slices/productSlice'
import Pagination from './../components/Pagination'

function Store() {
  const { pageNumber, keyword: urlKeyword } = useParams()
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: urlKeyword,
    pageNumber,
  })

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState(5000)
  const [searchInput, setSearchInput] = useState(urlKeyword || '')

  useEffect(() => {
    setSearchInput(urlKeyword || '')
  }, [urlKeyword])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search/${searchInput.trim()}`)
    } else {
      navigate('/store')
    }
  }

  const handleReset = () => {
    setSelectedCategory('All')
    setPriceRange(5000)
    setSearchInput('')
    navigate('/store')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#E5E5E1] text-zinc-500 font-serif italic animate-pulse text-4xl">
        Accessing Archive...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#E5E5E1] flex items-center justify-center p-10">
        <div className="text-center">
          <p className="text-red-500 uppercase tracking-[0.5em] text-xs font-black">
            Error Accessing Store
          </p>
          <p className="text-zinc-400 text-xs mt-4 font-mono">{error.message}</p>
        </div>
      </div>
    )
  }

  const categories = ['All', ...new Set(data.products?.map((item) => item.category))]

  const filteredProducts = data.products?.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesPrice = item.price <= priceRange
    return matchesCategory && matchesPrice
  })

  return (
    // INCREASED pt-44 to ensure content clears the fixed Navbar
    <div className="min-h-screen bg-[#E5E5E1] pt-44 pb-32 px-6 md:px-12 selection:bg-zinc-300">
      {/* Header Section - Larger Text */}
      <div className="max-w-[1700px] mx-auto mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="border-l-[10px] border-zinc-900 pl-8">
          <span className="text-zinc-500 text-xs uppercase tracking-[0.6em] font-black block mb-4">
            Collection Detail
          </span>
          <h1 className="text-6xl md:text-9xl font-serif italic tracking-tighter text-zinc-900 leading-[0.8]">
            The{' '}
            <span className="not-italic font-sans font-black uppercase tracking-tighter text-zinc-900">
              Store
            </span>
          </h1>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="group flex items-center gap-4 bg-white shadow-2xl border border-white text-zinc-900 px-10 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-500 active:scale-95">
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              showFilters
                ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]'
                : 'bg-zinc-300 group-hover:bg-white'
            }`}
          />
          {showFilters ? 'Collapse Filters' : 'Expand Filters'}
        </button>
      </div>

      <div className="max-w-[1700px] mx-auto flex flex-col xl:flex-row gap-16">
        {/* Sidebar - Adjusted sticky top to match new padding */}
        {showFilters && (
          <aside className="w-full xl:w-[400px] shrink-0 h-fit p-12 bg-white/60 backdrop-blur-3xl rounded-[4rem] border border-white shadow-2xl sticky top-44">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Inventory Count
              </span>
              <span className="text-xl font-serif italic text-zinc-900">
                {filteredProducts?.length} Items
              </span>
            </div>

            {/* Search Input - Larger text and padding */}
            <div className="mb-12">
              <label className="block text-xs font-black uppercase tracking-[0.3em] text-zinc-900 mb-6 ml-1">
                Search Archive
              </label>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  className="w-full bg-white border-2 border-transparent border-b-zinc-200 py-5 px-2 text-xl font-bold text-zinc-900 outline-none focus:border-b-zinc-900 transition-all placeholder:text-zinc-300"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>

            {/* Category Select - Large scale */}
            <div className="mb-12">
              <label className="block text-xs font-black uppercase tracking-[0.3em] text-zinc-900 mb-6 ml-1">
                Categorization
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-100 p-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] text-zinc-900 outline-none cursor-pointer hover:border-zinc-900 transition-all appearance-none shadow-sm">
                  {categories.map((cat, i) => (
                    <option key={i} value={cat} className="text-zinc-900 bg-white font-bold">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-900 font-black">
                  ↓
                </div>
              </div>
            </div>

            {/* Price Slider - Thicker UI */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-zinc-900 ml-1">
                  Price Ceiling
                </label>
                <span className="text-xs font-black bg-zinc-900 text-white px-5 py-2 rounded-full shadow-lg">
                  MAD {priceRange}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="5000"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full py-8 text-xs font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-red-600 transition-all border-t border-zinc-100 mt-6 pt-10">
              Reset Parameters
            </button>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 transition-all duration-700">
          {filteredProducts?.length > 0 ? (
            <div className="space-y-24">
              <Grid products={filteredProducts} />
              <div className="pt-24 border-t-2 border-zinc-200">
                <Pagination
                  pages={data.pages}
                  page={data.page}
                  keyword={urlKeyword ? urlKeyword : ''}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-56 bg-white/30 rounded-[4rem] border-4 border-dashed border-zinc-200">
              <p className="text-zinc-400 font-serif italic text-3xl mb-10">
                No entries found in archive.
              </p>
              <button
                onClick={handleReset}
                className="bg-zinc-900 text-white px-14 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-zinc-700 shadow-2xl transition-all active:scale-95">
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Store
