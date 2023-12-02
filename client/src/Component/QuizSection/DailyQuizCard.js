import React, {useEffect, useState} from 'react';
import {Card, CardContent, Button, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import {Link} from 'react-router-dom';
import QuizDialogBoxInstruction from './QuizDialogBoxInstruction';

const DailyQuizCard = ({elem, hasAttempted}) => {
  const [disable, setDisable] = useState(false);
  const newDate = new Date(elem.date);
  let formattedDate = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
  const currentDate = new Date();
  const quizDate = new Date(elem.date);
  const [dialogOpen, setDialogOpen] = useState(false);
  const onAttemptQuiz = async () => {
    setDialogOpen(true);
    // Perform actions when attempting quiz
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const isCurrentDay = quizDate.toDateString() === currentDate.toDateString();

  useEffect(() => {
    setDisable(hasAttempted && isCurrentDay);
  }, [hasAttempted, isCurrentDay]);

  

  return (
    <Card
      style={{
        marginBottom: '20px',
        border: isCurrentDay ? '2px solid #2196f3' : '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        animation: isCurrentDay ? 'pulse 1.5s infinite' : 'none',
        transition: 'border 1s ease-in-out',
        maxWidth: '100%', // Add this to ensure the card doesn't exceed the viewport width
      }}
    >
      <CardContent style={{display: 'flex', alignItems: 'center'}}>
        <AccessTimeIcon style={{marginRight: '8px'}} />
        <Typography variant="h6" component="div">
          {new Date(elem.date).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>
      </CardContent>
      <CardContent style={{display: 'flex', alignItems: 'center'}}>
        {hasAttempted ? (
          <>
            <Link to={`/dailyQuiz/analysis/${formattedDate}`}>
              <Button variant="contained">
                Score
              </Button>
            </Link>
            {disable ? (
              <div
                style={{
                  display: 'block',
                  marginLeft: '10px',
                  pointerEvents: 'none',
                  opacity: 0.6,
                }}
              >
                <Button variant="contained" disabled>
                  <QuizIcon style={{marginRight: '8px'}} />
                  Attempt Quiz
                </Button>
              </div>
            ) : (

              <Button
                variant="contained"
                onClick={onAttemptQuiz}
                style={{display: 'block', marginLeft: '10px'}}
              >
                <QuizIcon style={{marginRight: '8px'}} />
                Attempt Quiz
              </Button>

            )}
          </>
        ) : (

          <Button
            variant="contained"
            onClick={onAttemptQuiz}
            style={{display: 'block', marginLeft: '10px'}}
          >
            <QuizIcon style={{marginRight: '8px'}} />
            Attempt Quiz
          </Button>

        )}
      </CardContent>
      <QuizDialogBoxInstruction open={dialogOpen} handleClose={handleCloseDialog} goToQuiz={formattedDate} isCurrentDay={isCurrentDay} />
    </Card>
  );
};

export default DailyQuizCard;
