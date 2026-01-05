import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div className=" h-screen bg-black text-white flex justify-center items-center flex-col gap-7 space-x-6">
      <h1 className="text-9xl text-center capitalize font-bold">not found</h1>
      <Link to="/" className="bg-white text-black p-5 rounded-2xl text-3xl">
        go back home
      </Link>
    </div>
  )
}

export default NotFound
