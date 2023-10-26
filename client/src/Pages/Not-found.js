import React from 'react';
import {Link} from 'react-router-dom';

const Notfound = () => {
   return (
      <>
         <div className="bg-gray-100 flex items-center justify-center h-auto">
            <div className="text-center">
               <h1 className="text-6xl text-gray-800 font-semibold">404</h1>
               <p className="text-2xl text-gray-600 mb-4">Page Not Found</p>
               <p className="text-gray-700">Sorry, the page you are looking for could not be found.</p>
               <Link to="/" className="text-blue-500 mt-4 hover:underline">Go Home</Link>
            </div>
         </div>
      </>
   );
};

export default Notfound;