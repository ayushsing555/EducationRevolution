import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getSectionQuiz} from '../../Component/ApiFunctions/getQuizData';
import QuizCard from '../../Component/PracticeQuiz/QuizCard';
import {Container, Grid, Button, Typography, TextField} from '@mui/material';
import {Link} from 'react-router-dom';
import AddCourseQuizBtn from '../../Component/QuizAdmin/AddCourseQuizBtn';
const SectionQuiz = () => {
    const {name, sectionId} = useParams();
    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSectionQuiz(name, sectionId);
                if (data) {
                    setQuiz(data);
                }
                setLoading(false);
            }
            catch (e) {
                console.log('the error is', e);
            }
        };
        fetchData();
    }, [1]);
    console.log(quiz);
    return (

        <>
            <Container maxWidth="xl">
                <div className="my-6 sm:my-8 lg:my-12 text-center">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
                            Quizes
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
                        quiz.map((elem) => {
                            return (
                                <>
                                    <QuizCard elem={elem} courseName={name} sectionId={sectionId} title={'section'} />

                                </>
                            );
                        })
                    }
                </Grid>
            </Container>

        </>
    );
};

export default SectionQuiz;