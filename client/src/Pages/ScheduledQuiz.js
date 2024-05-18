import React, {useEffect, useState} from 'react';
import {getScheduledQuiz} from '../Component/ApiFunctions/getQuizData';
import LoadingComponent from '../Component/Loading';
import NoDataFound from '../Component/NoDataFound';
import {Grid} from '@mui/material';
import QuizCard from '../Component/QuizSection/Scheduled/QuizCard';
const ScheduledQuiz = () => {
  const [scheduledQuiz, setScheduledQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduledQuiz();
      setScheduledQuiz(data);
      console.log(scheduledQuiz.length);
      setLoading(false);
    };
    fetchData();
  }, [1]);
  if (loading) {
    return <LoadingComponent />;
  }
  if (scheduledQuiz.length === 0) {
    return <NoDataFound />;
  }
  return (
    <>
      <div>
        <h1 style={{textAlign: 'center', paddingTop: '20px', fontWeight: '500', fontSize: '2rem'}}>Welcome to the Quiz App</h1>

        {/* Using Material-UI Grid to arrange QuizCards */}
        <Grid container spacing={4}>
          {scheduledQuiz.map((elem, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <QuizCard elem={elem} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ScheduledQuiz;