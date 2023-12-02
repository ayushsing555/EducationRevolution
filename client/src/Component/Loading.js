import React from 'react'

const LoadingComponent = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 bg-opacity-60 bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <h1 className='text-bold ml-2'>Loading Your Content</h1>
      </div>
    </div>
  )
}

export default LoadingComponent