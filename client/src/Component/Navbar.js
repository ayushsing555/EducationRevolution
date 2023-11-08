import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const user = localStorage.getItem("name");
        if (user !== null) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <div>
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
                                <Link to="/Logout" className="text-white hover:underline mx-4">logout</Link>
                                <Link to="/course" className='text-white hover:underline mx-4'>Courses</Link>
                                <Link to="/quiz" className="text-white hover:underline mx-4">QuizSection</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;