import React from 'react'
import { Link } from 'react-router-dom'

function Pagination({ pages, page }) {
  return (
    pages > 1 && (
      <div className="flex justify-center my-4">
        <nav className="inline-flex -space-x-px rounded-md shadow-sm">
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={`/store/page/${x + 1}`}
              className={`relative inline-flex text-white items-center px-4 py-2 text-sm font-semibold border ${
                x + 1 === page
                  ? 'z-10 bg-orange-600 text-white  focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
             `}>
              {x + 1}
            </Link>
          ))}
        </nav>
      </div>
    )
  )
}

export default Pagination
