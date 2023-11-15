import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoggedInOrNot} from '../Component/LoggedInOrNot';
import {getAllCourses} from '../Component/ApiFunctions/getAllCourses';
import {Container, Typography, Grid,  TextField, Button} from '@mui/material';

import Box from '../Component/Box';
import LoadingComponent from '../Component/Loading';
import NoDataFoundComponent from '../Component/NoDataFound';

import AddCourseBtn from '../Component/AddCourseBtn';
const Course = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [searchText, setsearchText] = useState("");
    const getStatusOfLoggedIn = () => {
        let loggedInOrNot = LoggedInOrNot();
        if (!loggedInOrNot) {
            navigate('/signin');
        }
        setIsLoggedIn(loggedInOrNot);
    };

    const fetchData = async () => {
        try {
            const data = await getAllCourses();
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const filteredSections = courses.filter((elem) => {
    const courseName = elem.name.toLowerCase();
    const query = searchText.toLowerCase();
    return courseName.includes(query);
  });

    useEffect(() => {
        getStatusOfLoggedIn();
        fetchData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <Container maxWidth="xl">
            <div className="my-6 sm:my-8 lg:my-12 text-center">

                <AddCourseBtn refreshData={fetchData} /> <Button onClick={fetchData}>refresh</Button>

                <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
                    Our Courses
                </Typography>
                <Typography variant="h6" component="p" className="text-gray-500 md:text-lg">
                    Select Any Course
                </Typography>
            </div>
            <TextField
                label="Search Courses"
                variant="outlined"
                value={searchText}
                fullWidth
                className="mb-4"
                onChange={(e) => setsearchText(e.target.value)}
            />
            {filteredSections.length === 0 ? (
                <NoDataFoundComponent />
            ) : (
                <Grid container spacing={4}>
                    {filteredSections.map((elem) => {
                        
                            return (
                                <Box
                                    title="course"
                                    elem={elem}
                                    refreshData = {fetchData}
                                />
                            );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default Course;
