import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Radio, Button, Container, Paper} from '@material-ui/core';
import { Typography } from '@mui/material';
import LoadingComponent from '../Component/Loading';
import NoDataFound from '../Component/NoDataFound';
import {getQuizForDate} from '../Component/ApiFunctions/getQuizData';
import QuizResult from '../Component/QuizSection/QuizResult';
import {sendResult} from '../Component/ApiFunctions/AddQuizApi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  quizContainer: {
    padding: theme.spacing(3),
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
  },
  question: {
    fontSize: '1.5rem',
    color: 'red',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  optionsContainer: {
    margin: theme.spacing(2, 0),
  },
  option: {
    display: 'flex',
    color: 'blue',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
  dateText: {
    fontSize: '1rem',
    marginBottom: theme.spacing(2),
  },
  score: {
    fontSize: '1.5rem',
    color: 'green',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
}));

const QuizPage = () => {
  const classes = useStyles();
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const {day, month, year} = useParams();
  const formattedDate = new Date(`${month}/${day}/${year}`);
  const [show, setShow] = useState(true);
  const [score, setScore] = useState(0);

  const isCurrentDay = new Date().toDateString() === formattedDate.toDateString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuizForDate(formattedDate);
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [1]);
  useEffect(() => {
    const updateScore = async () => {
      const scores = await calculateScore();
      setScore(scores);
    };

    updateScore(); // Call the function to update the score
  }, [userAnswers]);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleQuizSubmit = async (quizData) => {
    console.log('Submitting quiz');
    await calculateScore();

    const result = await sendResult(quizData[0], score, wrongAnswer, isCurrentDay);
    if (result === true) {
      toast.success('Link Copied!', {
        position: 'bottom-right',
        autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
      });
      setShow(false);
    }
    else {
      toast.error("can't submit twice in a day", {
        position: 'bottom-right',
        autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
      });
    }
  };

  const calculateScore = async () => {
    setWrongAnswer([]);
    if (!quizData || !quizData[0] || !quizData[0].quiz) {
      console.log('Quiz data is undefined or does not have the expected structure.');
      return 0;
    }
    const userScore = quizData[0].quiz.reduce((scores, elem) => {
      const questionId = elem._id;
      const answer = elem.answer;
      const userAnswer = userAnswers[questionId];
      if (userAnswer && answer === userAnswer) {
        console.log(answer, userAnswer);
        return scores + 1;
      } else {
        wrongAnswer.push(elem.questionName);
      }
      return scores;
    }, 0);
    return userScore;
  };

  return (
    
    <Container className={classes.quizContainer}>
      {loading ? (
        <LoadingComponent />
      ) : quizData.length === 0 ? (
        <NoDataFound />
      ) : (
        <>
          <Typography variant="h5" className={classes.dateText}>
            {formattedDate.toDateString()}
          </Typography>
          {show ? (
            <>
              {quizData[0].quiz.map((elem, index) => (
                <Paper key={elem._id} elevation={3} className={classes.optionsContainer}>
                  <Typography variant="h6" className={classes.question}>
                    Question {index + 1}: {elem.questionName}
                  </Typography>
                  {elem.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={classes.option}>
                      <Radio
                        color="primary"
                        checked={userAnswers[elem._id] === option}
                        onChange={() => handleOptionChange(elem._id, option)}
                      />
                      <Typography>{option}</Typography>
                    </div>
                  ))}
                </Paper>
              ))}
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                onClick={() => handleQuizSubmit(quizData)}
              >
                Submit Quiz
              </Button>
            </>
          ) : (
            <QuizResult score={score} isCurrentDay={isCurrentDay} />
          )}
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default QuizPage;
