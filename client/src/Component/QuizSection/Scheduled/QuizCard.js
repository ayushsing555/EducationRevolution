import React from 'react';
import {Button, Tooltip, Box, Typography} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import {Link} from 'react-router-dom';
import {sendNotificationForQuiz} from '../../ApiFunctions/sendEmails';

const QuizCard = ({elem}) => {
  const handleStartQuiz = () => {
    console.log('Quiz started!');
  };

  const handleSendNotification = async () => {
    const result = await sendNotificationForQuiz(elem._id);
    console.log('Notification sent for quiz!');
  };

  const handleViewResult = () => {
    console.log('Viewing result!');
  };

  const handleFollowUp = () => {
    console.log('Follow-up action!');
  };

  const isQuizClosed = new Date(elem.date) < new Date();

  return (
    <Box
      sx={{
        border: '2px solid #007bff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        margin: 'auto',
        marginTop: '30px',
        backgroundColor: '#f5f5f5',  // Changed to a light background color
      }}
    >
      <Typography variant="h5" gutterBottom>
        📝 Quiz Information
      </Typography>

      {/* Quiz Name */}
      <Typography variant="subtitle1" gutterBottom>
        <strong>Quiz Name:</strong> {elem.QuizName}
      </Typography>

      {/* Quiz Duration */}
      <Tooltip title={`Quiz Duration: ${elem.duration} minutes`} arrow>
        <Typography variant="body2" gutterBottom>
          <AccessTimeIcon sx={{marginRight: '8px'}} /> Quiz Duration: {`${elem.duration}`} minutes
        </Typography>
      </Tooltip>

      {/* Quiz Date */}
      <Tooltip title={`Quiz Date: ${new Date(elem.date).toLocaleDateString()}`} arrow>
        <Typography variant="body2" gutterBottom>
          <EventIcon sx={{marginRight: '8px'}} /> Quiz Date: {new Date(elem.date).toLocaleDateString()}
        </Typography>
      </Tooltip>

      {/* Start Quiz Button */}
      <Link to={`/Quizes/${elem._id}`}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartQuiz}
          disabled={isQuizClosed}
          sx={{marginTop: '20px', width: '100%', borderRadius: '5px'}}
        >
          {
            !isQuizClosed ? 'Start Quiz Now 🚀' : 'Quiz Closed'
          }
        </Button>
      </Link>
      {
        !isQuizClosed && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSendNotification}
            sx={{marginTop: '10px', width: '100%', borderRadius: '5px'}}
          >
            Send Notification
          </Button>
        )
      }
      {
        isQuizClosed && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleViewResult}
              sx={{marginTop: '10px', width: '100%', borderRadius: '5px'}}
            >
              View Result
            </Button>

            <Box sx={{display: 'flex', gap: '10px', marginTop: '10px'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFollowUp}
                sx={{flexGrow: 1, borderRadius: '5px'}}
              >
                Follow-up
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSendNotification}
                sx={{flexGrow: 1, borderRadius: '5px'}}
              >
                Send Notification
              </Button>
            </Box>
          </>
        )
      }
    </Box>
  );
};

export default QuizCard;
