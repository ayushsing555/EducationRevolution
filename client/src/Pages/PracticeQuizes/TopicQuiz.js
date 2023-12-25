import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getTopicQuiz} from '../../Component/ApiFunctions/getQuizData';
import LoadingComponent from '../../Component/Loading';
import QuizCard from '../../Component/PracticeQuiz/QuizCard';
import {Container, Grid} from '@mui/material';
import NoDataFound from '../../Component/NoDataFound';
import {   Typography, TextField} from '@mui/material';
import {Link} from 'react-router-dom'
const TopicQuiz = () => {
    const {name, sectionId, topicId} = useParams();
    const [Quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery,setSearchQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopicQuiz(name, sectionId, topicId);
                if (data) {
                    setQuiz(data);
                }
                setLoading(false);
            }
            catch (e) {
                console.log('the error is ', e);
                setLoading(false);
            }
        };
        fetchData();
    }, [1]);
    if (loading) {
        return <LoadingComponent />;
    }

    if(Quiz.length===0){
        return <NoDataFound/>
    }

    return (
        <>
            <Container maxWidth="xl">
            <div className="my-6 sm:my-8 lg:my-12 text-center">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
                            Quizes
                        </Typography>
                        
                    </div>
                    <Typography variant="h6" component="p" className="text-gray-500 md:text-lg">
                        Select Any Section
                    </Typography>
                    <Link to={`/course/${name}/${sectionId}`} className="text-indigo-500 hover:underline">
                        Back to topic
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
                            if(elem.QuizName.indexOf(searchQuery)!==-1)
                            return (
                                <>
                                    <QuizCard elem={elem} courseName={name} sectionId={sectionId} TopicId={topicId} title={'topic'} />
                                </>
                            );
                        })
                    }
                </Grid>

            </Container>

        </>
    );
};

export default TopicQuiz;