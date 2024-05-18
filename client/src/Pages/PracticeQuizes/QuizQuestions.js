import React, {useState, useEffect} from 'react';
import {
  Typography,
  Paper,
  Radio,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@material-ui/core';

const QuizQuestions = ({getQuizDataFunction, params, pageName}) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuizDataFunction(...params);
      if (data !== false) {
        setQuizQuestions(data.QuizSet);
      }
      setLoading(false);
    };
    fetchData();
  }, [...params, getQuizDataFunction]);

  const handleOptionSelect = (selectedOption) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[quizIndex] = selectedOption;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[quizIndex] = userAnswers[quizIndex];
      return updatedAnswers;
    });

    setQuizIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress />
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <Paper style={{padding: 20, margin: 20}}>
        <Typography variant="h5">No questions found</Typography>
      </Paper>
    );
  }

  const currentQuestion = quizQuestions[quizIndex];

  return (
    <Paper style={{padding: 20, margin: 20}}>
      <Typography variant="h5" gutterBottom>
        <strong style={{color: 'red'}}>Question {quizIndex + 1}/{quizQuestions.length}:</strong> {currentQuestion.questionName}
      </Typography>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={userAnswers[quizIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                />
              }
              label={option}
            />
          </li>
        ))}
      </ul>
      {userAnswers[quizIndex] && (
        <>
          <Typography variant="body1">
            Your answer: <strong>{userAnswers[quizIndex]}</strong>
          </Typography>
          <Typography variant="body1">
            Correct answer: <strong>{currentQuestion.answer}</strong>
          </Typography>
          {quizIndex < quizQuestions.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNextQuestion}>
              Next Question
            </Button>
          ) : (
            <Typography variant="h6" style={{marginTop: 20}}>
              End of Quiz
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default QuizQuestions;
