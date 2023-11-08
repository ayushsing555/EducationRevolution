import React from 'react';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const SmallNavbar = () => {
    let location = useLocation();
    const pathname = (location.pathname);
    return (
        <div class="items-center border-4 justify-center m-2  hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex border-2 flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {
        pathname.indexOf("content")===-1?<li>
        <button className='btn bg-blue-500 rounded hover:bg-blue-400 text-white p-2'>
                <Link to="/admin/content" class="">
                Go to Content
                </Link>
            </button>
      </li>:<li>
        
            <button className='btn bg-blue-500 rounded hover:bg-blue-400 text-white p-2'>
                <Link to="/admin/student" class="">
                Go to students
                </Link>
            </button>
      </li>
      }
      
    </ul>
  </div>
    );
};

export default SmallNavbar;