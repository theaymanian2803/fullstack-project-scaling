import React from 'react'
import { Star, StarHalf } from 'lucide-react'

function Rating({ value, text }) {
  // Define common props for filled stars
  const filledStarProps = {
    fill: 'currentColor', // Fills the star using the current text color (text-amber-300)
    strokeWidth: 0, // Removes the outline for a solid appearance
  }

  // Define common props for empty stars
  const emptyStarProps = {
    fill: 'none', // Explicitly keeps the star empty
    strokeWidth: 2, // Keeps the outline visible
  }

  return (
    <div className="flex items-center">
      {/* Star 1 */}
      <span className="text-amber-300">
        {value >= 1 ? (
          <Star {...filledStarProps} />
        ) : value >= 0.5 ? (
          <StarHalf {...filledStarProps} />
        ) : (
          <Star {...emptyStarProps} />
        )}
      </span>

      {/* Star 2 */}
      <span className="text-amber-300">
        {value >= 2 ? (
          <Star {...filledStarProps} />
        ) : value >= 1.5 ? (
          <StarHalf {...filledStarProps} />
        ) : (
          <Star {...emptyStarProps} />
        )}
      </span>

      {/* Star 3 */}
      <span className="text-amber-300">
        {value >= 3 ? (
          <Star {...filledStarProps} />
        ) : value >= 2.5 ? (
          <StarHalf {...filledStarProps} />
        ) : (
          <Star {...emptyStarProps} />
        )}
      </span>

      {/* Star 4 */}
      <span className="text-amber-300">
        {value >= 4 ? (
          <Star {...filledStarProps} />
        ) : value >= 3.5 ? (
          <StarHalf {...filledStarProps} />
        ) : (
          <Star {...emptyStarProps} />
        )}
      </span>

      {/* Star 5 */}
      <span className="text-amber-300">
        {value >= 5 ? (
          <Star {...filledStarProps} />
        ) : value >= 4.5 ? (
          <StarHalf {...filledStarProps} />
        ) : (
          <Star {...emptyStarProps} />
        )}
      </span>

      {/* Optional: Add text if it was included in your original function */}
    </div>
  )
}

export default Rating
