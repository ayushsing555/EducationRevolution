import React from 'react'

const LoadingComponent = () => {
  return (
     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-60 bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900">
         
      </div>
      <h1 className='text-bold'>Loading Your Content</h1>
    </div>
  )
}

export default LoadingComponent