import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('name');
        if (user !== null) {
            setLoggedIn(true);
        }
    }, []);

    const logout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        
        // Update the 'loggedIn' state to false
        setLoggedIn(false);
        // Redirect to the home page or any other desired page after logout
    };

    return (
        <>
            <nav className="bg-blue-500 p-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="#" className="text-white text-2xl font-bold">Logo</Link>
                    <div>
                        <Link to="/" className="text-white hover:underline mx-4">Home</Link>
                        <Link to="/about" className="text-white hover:underline mx-4">About</Link>
                        {
                            !loggedIn ? <>
                                <Link to="/signin" className="text-white hover:underline mx-4">SignIn</Link>
                                <Link to="/signup" className="text-white hover:underline mx-4">SignUp</Link>
                            </> : <>
                                <Link onClick={logout} className="text-white hover:underline mx-4">logout</Link>
                                <Link to="/course" className='text-white hover:underline mx-4'>Courses</Link>
                                <Link to="/quiz"className='text-white hover:underline mx-4'>Quiz</Link>
                                <Link to ='/admin' className='text-white hovdr:underline mx-4'>Admin</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;