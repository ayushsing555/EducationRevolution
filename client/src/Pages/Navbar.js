import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('Detail');
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
                    <Link href="#" className="text-white text-2xl font-bold">
                        <img width={100} height={100} src='/Image/logo/logo192.png'></img>
                    </Link>
                    <div>
                        <Link to="/" className="text-white hover:underline mx-4">Home</Link>
                        <Link to="/about" className="text-white hover:underline mx-4">About</Link>
                        {
                            !loggedIn ? <>
                                <Link to="/signin" className="text-white hover:underline mx-4">SignIn</Link>
                                <Link to="/signup" className="text-white hover:underline mx-4">SignUp</Link>
                            </> : <>
                                <Link to="https://playful-koala-t2pxzo-dev-ed.trailblaze.lightning.force.com/lightning/n/Home1" className='text-white hover:underline mx-4' target='_blank'>Lightning</Link>
                                <Link to="/course" className='text-white hover:underline mx-4'>Courses</Link>
                                <Link to='/admin' className='text-white hover:underline mx-4'>Admin</Link>
                                {/* <Link to='/DailyQuiz' className='text-white hover:underline mx-4'>Daily Quiz</Link> */}
                                <Link to='/Quizes' className='text-white hover:underline mx-4'>Quizes</Link>
                                <Link to='/createQuiz' className='text-white hover:underline mx-4'>Create Quiz</Link>
                                <Link onClick={logout} className="text-white hover:underline mx-4">logout</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;