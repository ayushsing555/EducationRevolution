import React, {useEffect, useState} from 'react';
import Loading from '../Component/Loading';
import {LoggedInOrNot} from '../Component/LoggedInOrNot';
import Modal from 'react-modal';
import AddCourseBtn from '../Component/AddCourseBtn';
import {Link, useNavigate} from 'react-router-dom';
const Course = () => {
    const navigate = useNavigate();
    const [isloggedIn, setIsloggedIn] = useState(false);
    const [course, setcourse] = useState([]);
    const getStatusOfLoggedIn = () => {
        let LoggedInOrNots = LoggedInOrNot();
        if(!LoggedInOrNots){
            navigate("/signin");
        }
        setIsloggedIn(LoggedInOrNots);
    };
    const getCourseData = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        const getCourses = await fetch("http://localhost:8000/course", {
            method: "get",
            headers: headersList,
        });
        const data = await getCourses.json();
        setcourse(data.reverse());
    };
    useEffect(() => {
        getCourseData();
        getStatusOfLoggedIn();
    }, [1]);
    if (course.length === 0) {
        return (
            <>
                <div><Loading /></div>
            </>
        );
    }
    return (
        <>
            {
                isloggedIn  ? <>
                     <AddCourseBtn getCourses = {getCourseData}/>
                </> : ""
            }
            

            <div class="bg-white py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div class="mb-10 md:mb-16">
                        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl underline">Our Courses</h2>
                        <h3 class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Select Any Course</h3>
                    </div>


                    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-8">
                        {
                            course.map((elem) => {
                                let date = new Date(elem.createdDate);
                                date = date.getDate() + "/" + (date.getMonth() + 1);
                                return (
                                    <>
                                        <div class="flex flex-col overflow-hidden rounded-lg border shadow-2xl bg-white">
                                            <Link to={`/course/${elem.name}`} class="group relative block h-32 overflow-hidden bg-gray-100 md:h-50">
                                                <img src={`/Image/Course/course${(Math.floor(Math.random() *3))}.jpg`} alt='' />
                                            </Link>
                                            <div class="flex flex-1 flex-col p-4 sm:p-6">
                                                <h2 class="mb-2 text-lg font-semibold text-gray-800">
                                                    <Link to={`/course/${elem.name}`} class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{elem.name}</Link>
                                                </h2>
                                                <div class="mt-auto flex items-end justify-between">
                                                    <div class="flex items-center gap-2">
                                                        <div>
                                                            <span class="block text-indigo-500">CreatedAt:</span>
                                                            <span class="">{date}</span>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <div>
                                                            <span class="block text-indigo-500">Sections</span>
                                                            <span class="">{elem.sections}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                        }
                    </div>


                </div>

            </div>



        </>
    );
};

export default Course;