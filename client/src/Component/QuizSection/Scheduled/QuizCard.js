import React from 'react';
import { Button, Tooltip, Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

const QuizCard = ({ elem }) => {
  const handleStartQuiz = () => {
    // Handle the start quiz action here
    console.log('Quiz started!');
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
          <AccessTimeIcon sx={{ marginRight: '8px' }} /> Quiz Duration: {`${elem.duration}`} minutes
        </Typography>
      </Tooltip>
      
      {/* Quiz Date */}
      <Tooltip title={`Quiz Date: ${new Date(elem.date).toLocaleDateString()}`} arrow>
        <Typography variant="body2" gutterBottom>
          <EventIcon sx={{ marginRight: '8px' }} /> Quiz Date: {new Date(elem.date).toLocaleDateString()}
        </Typography>
      </Tooltip>
      
      {/* Start Quiz Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleStartQuiz}
        disabled={isQuizClosed}
        sx={{ marginTop: '20px', width: '100%', borderRadius: '5px' }}
      >
        {
            !isQuizClosed?'Start Quiz Now 🚀':'Quiz Closed'
        }
        
      </Button>
    </Box>
  );
};

export default QuizCard;
