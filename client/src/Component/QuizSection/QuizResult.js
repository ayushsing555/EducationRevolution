import React,{useEffect} from 'react';
import { Card, CardContent, Button, makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { Typography } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(4),
  },
  content: {
    textAlign: 'center',
  },
  score: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: theme.spacing(2),
  },
  coinIcon: {
    width: '5em', // Adjust the size of the spinning coin
    animation: '$spin 2s linear infinite', // Add spinning animation
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
   coinImage: {
    width: '5em',
    margin:'auto' ,// Adjust the size of the coin image
    borderRadius: '50%', // Make the image circular
    marginTop: theme.spacing(2),
    animation: '$spin 2s linear infinite', // Add spinning animation
  },
  '@keyframes spin': {
    '0%': {
      transform: 'translateY(0) translateX(0)',
    },
    '50%': {
      transform: 'translateY(20px) ', // Adjust the distance of horizontal movement
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}));

const QuizResult = ({ score, streakDays }) => {
  const classes = useStyles();
  streakDays = 12;
  return (
   <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h6">Thanks for participating in the daily quiz!</Typography>
        <Typography variant="body1" className={classes.score}>
          Your score is: {score}
        </Typography>
        {score >= 4 &&  (
          <>
            <img
              src="./Image/Badges/coin.png" // Replace with the actual path or URL of your coin image
              alt="Coin"
              className={classes.coinImage}
            />
            <Typography variant="body1" className={classes.score}>
              You earned a  coin!
            </Typography>
          </>
        )}
        <Typography variant="body1" className={classes.score}>
          Streak Days: {streakDays}
        </Typography>
        <Link to="/dailyQuiz">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Back to Daily Quiz
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuizResult;
