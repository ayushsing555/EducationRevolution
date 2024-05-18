// QuizAttemptsHeatmap.js
import React, {useState, useEffect} from 'react';
import {Typography, Paper} from '@mui/material';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {getSingleUserDetail} from '../ApiFunctions/getAllCourses';
import {getUserDetail} from '../Functionality/GetUserDetail';
import LoadingComponent from '../Loading';

const QuizAttemptsHeatmap = () => {
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetail = getUserDetail();
        const singleUserDetail = await getSingleUserDetail(userDetail.email);
        const userActivity = singleUserDetail.Activity.map((elem) => elem.date);

        setQuizAttempts(userActivity);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // fetchData();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Paper elevation={2} style={{padding: '20px', marginBottom: '20px'}}>
      <Typography variant="h5" gutterBottom>
        Daily Quiz Attempts Heatmap
      </Typography>
      <CalendarHeatmap
        startDate={new Date('2023-08-01')}
        endDate={new Date('2023-12-31')}
        values={quizAttempts.map((date) => ({date: new Date(date)}))}
      />
    </Paper>
  );
};

export default QuizAttemptsHeatmap;
