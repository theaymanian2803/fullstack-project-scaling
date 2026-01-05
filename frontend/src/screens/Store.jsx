import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Grid from './../components/Grid'
import { useGetProductsQuery } from './../slices/productSlice'
import Pagination from './../components/Pagination'

function Store() {
  const { pageNumber, keyword: urlKeyword } = useParams()
  const navigate = useNavigate()

  // API Query handles the keyword and pageNumber server-side
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: urlKeyword,
    pageNumber,
  })

  // 1. States
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState(5000)

  // Local state for the input field text
  const [searchInput, setSearchInput] = useState(urlKeyword || '')

  // 2. Sync input field with URL keyword
  useEffect(() => {
    setSearchInput(urlKeyword || '')
  }, [urlKeyword])

  // 3. Search Logic (Redirects to /search/:keyword)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search/${searchInput.trim()}`)
    } else {
      navigate('/store') // Go back to full store if search is empty
    }
  }

  // 4. Reset Functionality
  const handleReset = () => {
    setSelectedCategory('All')
    setPriceRange(5000)
    setSearchInput('')
    navigate('/store') // Clear URL keyword
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl font-bold">
        Loading...
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>
  }

  const categories = ['All', ...new Set(data.products?.map((item) => item.category))]

  // 5. Combined Client-side Filtering (Category + Price only)
  // Search is now handled by the API/URL
  const filteredProducts = data.products?.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesPrice = item.price <= priceRange

    return matchesCategory && matchesPrice
  })

  return (
    <div className="p-4 md:m-7">
      {/* Header / Toggle Section */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-all active:scale-95">
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 min-h-screen">
        {/* Sidebar: Filter Card */}
        {showFilters && (
          <aside className="w-full md:w-1/4 lg:w-1/5 h-fit p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-800">
            <p className="text-sm text-gray-400 mb-6 font-medium">
              {filteredProducts?.length} products found
            </p>

            {/* Search - Now a Form to handle "Enter" key */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-black transition-all"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="hidden">
                  Search
                </button>
              </form>
            </div>

            {/* Category */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-sm outline-none bg-white cursor-pointer hover:border-gray-400 transition-colors">
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold">Price Range</label>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  Up to MAD {priceRange}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="5000"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>29</span>
                <span>5000+</span>
              </div>
            </div>

            <hr className="mb-6 border-gray-100" />

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">
              Reset All Filters
            </button>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 mb-4 flex flex-col gap-16 transition-all duration-300">
          {filteredProducts?.length > 0 ? (
            <Grid products={filteredProducts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No products match your criteria.</p>
              <button onClick={handleReset} className="mt-4 text-black underline text-sm font-bold">
                Clear all filters
              </button>
            </div>
          )}

          <div className="mt-auto">
            <Pagination
              pages={data.pages}
              page={data.page}
              keyword={urlKeyword ? urlKeyword : ''}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Store
