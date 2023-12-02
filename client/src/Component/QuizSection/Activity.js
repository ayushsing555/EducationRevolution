// UserDetails.js
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Avatar, Grid, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getUserDetail } from '../Functionality/GetUserDetail';
import { getSingleUserDetail } from '../ApiFunctions/getAllCourses';
import LoadingComponent from '../Loading';
import NoDataFound from '../NoDataFound';
import BadgeComponent from '../Achievement/Badge';

const Activity = ({ coins, dailyStreak, maxDailyStreak, profilePhoto }) => {
  const [Loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const userDetail = getUserDetail();
      const singleUserDetail = await getSingleUserDetail(userDetail.email);
      setLoading(false);
      setUserActivity(singleUserDetail);
    };
    fetchData();
  }, [1]);

  if (Loading) {
    return <LoadingComponent />;
  }

  if (userActivity.length === 0) {
    return <NoDataFound />;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        User Details
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" marginBottom="10px">
        <Avatar alt="Profile Photo" src={profilePhoto} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
        <BadgeComponent />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <EmojiEventsIcon fontSize="large" color="primary" style={{ marginRight: '5px' }} />
            <Typography variant="subtitle1">{userActivity.coins} Coins</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <ScheduleIcon fontSize="large" color="primary" style={{ marginRight: '5px' }} />
            <Typography variant="subtitle1">{dailyStreak} Daily Streak</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TrendingUpIcon fontSize="large" color="primary" style={{ marginRight: '5px' }} />
            <Typography variant="subtitle1">{maxDailyStreak} Max Streak</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Activity;
