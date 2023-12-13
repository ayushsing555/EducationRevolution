import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getTopicQuiz} from '../../Component/ApiFunctions/getQuizData';
import LoadingComponent from '../../Component/Loading';
import QuizCard from '../../Component/PracticeQuiz/QuizCard';
import {Container, Grid} from '@mui/material';
const TopicQuiz = () => {
    const {name, sectionId, topicId} = useParams();
    const [Quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
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
    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {
                        Quiz.map((elem) => {
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