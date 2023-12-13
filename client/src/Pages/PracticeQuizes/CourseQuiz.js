import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCourseQuiz} from '../../Component/ApiFunctions/getQuizData';
import QuizCard from '../../Component/PracticeQuiz/QuizCard';
import {Container, Grid, Button, Typography, TextField} from '@mui/material';
import AddCourseQuizBtn from '../../Component/QuizAdmin/AddCourseQuizBtn';
import {Link} from 'react-router-dom';
const CourseQuiz = () => {
    const {name} = useParams();
    const [Quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourseQuiz(name);
                if (data) {
                    setQuiz(data);
                }
                setLoading(false);
            } catch (e) {
                console.log("the error is occured", e);
                setLoading(false);
            }
        };
        fetchData();
    }, [1]);
    console.log(Quiz);
    return (
        <>
            <Container maxWidth="xl">
                <div className="my-6 sm:my-8 lg:my-12 text-center">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
                            {name}
                        </Typography>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <AddCourseQuizBtn part="SectionPage" course={{label: name}} />
                        </div>
                    </div>
                    <Typography variant="h6" component="p" className="text-gray-500 md:text-lg">
                        Select Any Section
                    </Typography>
                    <Link to="/course" className="text-indigo-500 hover:underline">
                        Back to Courses
                    </Link>
                </div>
                <TextField
                    label="Search Sections"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />
                <Grid container spacing={4}>
                    {
                        Quiz.map((elem) => {
                            return (
                                <>
                                    <QuizCard elem={elem} courseName={name} title={'course'} />
                                </>
                            );
                        })
                    }
                </Grid>

            </Container>

        </>

    );
};

export default CourseQuiz;