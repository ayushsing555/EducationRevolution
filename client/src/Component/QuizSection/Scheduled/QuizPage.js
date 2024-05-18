import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Radio, Button, Paper} from '@material-ui/core';
import {Typography} from '@mui/material';
import LoadingComponent from '../Component/Loading';
import NoDataFound from '../Component/NoDataFound';
// import QuizResult from '../Component/QuizSection/QuizResult';
// import {getQuizForDate} from '../Component/ApiFunctions/getQuizData';
import {sendResult} from '../Component/ApiFunctions/AddQuizApi';
import {getScheduledQuizDataById} from '../../ApiFunctions/getQuizData';
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
        WebkitTouchCallout: 'none', /* iOS Safari */
        WebkitUserSelect: 'none', /* Safari */
        KhtmlUserSelect: 'none', /* Konqueror HTML */
        MozUserSelect: 'none', /* Old versions of Firefox */
        MsUserSelect: 'none', /* Internet Explorer/Edge */
        userSelect: 'none', /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
    },
    optionsContainer: {
        margin: theme.spacing(2, 0),
    },
    option: {
        display: 'flex',
        color: 'blue',
        alignItems: 'center',
        margin: theme.spacing(1, 0),
        WebkitTouchCallout: 'none', /* iOS Safari */
        WebkitUserSelect: 'none', /* Safari */
        KhtmlUserSelect: 'none', /* Konqueror HTML */
        MozUserSelect: 'none', /* Old versions of Firefox */
        MsUserSelect: 'none', /* Internet Explorer/Edge */
        userSelect: 'none', /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
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
    unselectable: {
        WebkitTouchCallout: 'none', /* iOS Safari */
        WebkitUserSelect: 'none', /* Safari */
        KhtmlUserSelect: 'none', /* Konqueror HTML */
        MozUserSelect: 'none', /* Old versions of Firefox */
        MsUserSelect: 'none', /* Internet Explorer/Edge */
        userSelect: 'none', /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
    },
}));

const QuizPage = () => {
    const {id} = useParams();
    console.log(id);
    const classes = useStyles();
    const [wrongAnswer, setWrongAnswer] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState({});
    const {day, month, year} = useParams();
    const formattedDate = new Date(`${month}/${day}/${year}`);
    const [show, setShow] = useState(true);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(720); // 12 minutes in seconds

    const isCurrentDay = new Date().toDateString() === formattedDate.toDateString();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getScheduledQuizDataById(id);
                setQuizData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [formattedDate]);

    useEffect(() => {
        const updateScore = async () => {
            const scores = await calculateScore();
            setScore(scores);
        };

        updateScore();
    }, [userAnswers]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Auto-submit when the tab is switched
                handleQuizSubmit(quizData);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [quizData]);

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
                autoClose: 2000,
            });
            setShow(false);
        } else {
            toast.error("can't submit twice in a day", {
                position: 'bottom-right',
                autoClose: 2000,
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

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <Typography variant="h5" className={classes.dateText}>
                {formattedDate.toDateString()} - Time Remaining: {formatTime(timer)}
            </Typography>
            {show ? (
                <>
                    {quizData[0]?.quiz?.map((elem, index) => (
                        <Paper key={elem._id} elevation={3} className={classes.optionsContainer}>
                            <Typography variant="h6" className={`${classes.question} ${classes.unselectable}`}>
                                Question {index + 1}: {elem.questionName}
                            </Typography>
                            {elem.options.map((option, optionIndex) => (
                                <div key={optionIndex} className={`${classes.option} ${classes.unselectable}`}>
                                    <Radio
                                        color="primary"
                                        checked={userAnswers[elem._id] === option}
                                        onChange={() => handleOptionChange(elem._id, option)}
                                    />
                                    <Typography className={classes.unselectable}>{option}</Typography>
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
            <ToastContainer />
        </div>
    );
};

export default QuizPage;
