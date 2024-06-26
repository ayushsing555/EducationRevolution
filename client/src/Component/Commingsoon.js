import React from 'react'
import { Link } from 'react-router-dom';
const Commingsoon = () => {
  return  (
    <div className="flex flex-col items-center justify-center m-auto">
      <div className="text-4xl font-bold mb-4">Coming Soon</div>
      <p className="text-xl text-gray-600">We are working on something exciting. Stay tuned!</p>
      <Link to="/course" className="mt-4 text-blue-500 underline hover:text-blue-700">Back to the Course</Link>
      <Link to="/admin/students" className="mt-4 text-blue-500 underline hover:text-blue-700">Back to the Admin</Link>
    </div>
  );
}

export default Commingsoon