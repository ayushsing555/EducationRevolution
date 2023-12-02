// DailyQuiz.js
import React, {useEffect, useState} from 'react';
import {Typography, Grid, Button} from '@mui/material';
import DailyQuizCard from '../Component/QuizSection/DailyQuizCard';
import LoadingComponent from '../Component/Loading';
import NoDataFound from '../Component/NoDataFound';
import QuizAttemptsHeatmap from '../Component/QuizSection/QuizAttemptsHeatmap';
import {getUserDetail} from '../Component/Functionality/GetUserDetail';
import {useNavigate} from 'react-router-dom';
import Activity from '../Component/QuizSection/Activity';
import BadgeComponent from '../Component/Achievement/Badge';
import AllBadges from '../Component/Achievement/AllBadges';
const DailyQuiz = () => {
  const [show, setShow] = useState(false);
  const ExploreBadges = () => {
    setShow(true);
  };
  const handleCloseDialog = () => {
    setShow(false);
  };
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDetail = getUserDetail();
  if (userDetail == null) {
    navigate('/signin');
  }


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        let headersList = {
          Accept: '*/*',
          'Content-Type': 'application/json',
        };
        const response = await fetch('http://localhost:8000/dailyQuiz', {
          method: 'get',
          headers: headersList,
        });
        const data = await response.json();
        setQuizData(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching daily quiz:', error);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  return (
    <Grid container spacing={4} style={{overflowX: 'hidden'}}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 m-2 text-center lg:text-5xl">
          DAILY QUIZ
        </Typography>
        <div style={{maxHeight: '500px', overflowY: 'auto'}}>
          {loading ? (
            <LoadingComponent />
          ) : quizData.length === 0 ? (
            <NoDataFound />
          ) : (
            quizData.map((elem, index) => {
              const hasAttempted = elem.users.some((userObj) => userObj.email === userDetail.email);
              return <DailyQuizCard key={index} elem={elem} hasAttempted={hasAttempted} />;
            })
          )}
        </div>
        <Button
          variant="contained"
          style={{display: 'block', margin: 'auto', textAlign: 'center'}}
          onClick={ExploreBadges}
        >
          Explore Badges
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Activity coins={1000} dailyStreak={5} maxDailyStreak={7} profilePhoto="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <QuizAttemptsHeatmap />
        <AllBadges open={show} handleClose={handleCloseDialog} />
      </Grid>
    </Grid>
  );
};

export default DailyQuiz;
