import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInOrNot } from '../Component/LoggedInOrNot';
import { getAllCourses } from '../Component/ApiFunctions/getAllCourses';
import { Container, Typography, Grid, Card, CardContent, CardMedia, TextField, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingComponent from '../Component/Loading';
import NoDataFoundComponent from '../Component/NoDataFound';
import {  Delete, Edit } from '@mui/icons-material';
import AddCourseBtn from '../Component/AddCourseBtn';
const Course = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [isAdmin,setIsAdmin] = useState(true);
    const [searchText,setsearchText] = useState("");
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

    useEffect(() => {
        getStatusOfLoggedIn();
        fetchData();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    const handleUpdate = ()=>{

    }
    const handleDelete = () =>{

    }



    return (
        <Container maxWidth="xl">
            <div className="my-6 sm:my-8 lg:my-12 text-center">

               <AddCourseBtn/> <Button onClick={fetchData}>refresh</Button>
              
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
                fullWidth
                className="mb-4"
                value={(e)=>setsearchText(e.target.value)}
            />
            {courses.length === 0 ? (
                <NoDataFoundComponent />
            ) : (
                <Grid container spacing={4}>
                    {courses.map((elem) => {
                        const date = new Date(elem.createdDate);
                        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
                        if(elem.name.indexOf(searchText)!==-1)
                        return (
                            <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card elevation={3} className="h-full flex flex-col">
                                    <Link to={`/course/${elem.name}`}>
                                        <CardMedia
                                            component="img"
                                            style={{
                                                height: '150px',
                                                objectFit: 'cover',
                                                maxWidth: '100%',
                                                borderRadius: '20px',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                            }}
                                            image={`/Image/Course/course${Math.floor(Math.random() * 3)}.jpg`}
                                        />
                                    </Link>
                                    <CardContent className="flex-1 text-center">
                                        <Typography variant="h6" component="h2" className="mb-2 text-gray-800">
                                            <Link to={`/course/${elem.name}`} className="hover:text-indigo-500 active:text-indigo-600">
                                                {elem.name}
                                            </Link>
                                        </Typography>
                                        <div className="mt-auto flex items-end justify-between">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <span className="block text-indigo-500">CreatedAt:</span>
                                                    <span>{formattedDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <span className="block text-indigo-500">Sections</span>
                                                    <span>{elem.totalSections}</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        {isAdmin && (
                      <div className="mt-3">
                        <IconButton
                          color="primary"
                          onClick={() => handleUpdate(elem._id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(elem._id)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default Course;
