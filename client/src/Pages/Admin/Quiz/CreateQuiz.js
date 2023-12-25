import React, {useState} from 'react';

import {
    Button,
    Typography,
    TextField,
    Card,
    Paper,
    CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { AddContentApi } from './ApiFunctions/AddCourseApi';
import {isValidImage} from '../../../Component/Functionality/ValidityFunction/isValidImage';
// import {AddQuizCourse} from '../ApiFunctions/AddQuizApi';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import {SendRandomQuiz} from '../../../Component/ApiFunctions/AddQuizApi';
const CreateQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [questionName, setQuestionName] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState('');
    const [QuizName, setQuizName] = useState('');
    const [timeDuration, setTimeDuration] = useState(); // Added state for time duration
    const [selectedDate, setSelectedDate] = useState(""); // Added state for date
    // console.log(questions);

    const handleSubmit = async (e) => {
        if (questions.length === 0) {
            return alert('Please add at least one question');
        }

        if (isNaN(timeDuration)) {
            return alert('please add time in minutes(120)');
        }
        
        if (QuizName === '') {
            return alert("Please give a Quiz Name");
        }

        const selectedDateObject = new Date(selectedDate);
        if((selectedDateObject < new Date())){
            return alert("Please select a date at least one day later than today")
        }
        console.log("Ayush");
        const result = await SendRandomQuiz(QuizName, timeDuration, selectedDate, questions);
        if (result) {
            setQuestions([]);
            setQuizName("");
            toast.success('QuizAdded', {
                position: 'bottom',
                autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
            });
        }
        else {
            toast.error('Failed to Add Quiz', {
                position: 'bottom-right',
                autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
            });
        }

    };






    const addQuestion = async () => {
        
        if (image !== '') {
            const result = await isValidImage(image);
            if (result) {
                // Check if all options are different
                if (new Set(options).size !== options.length) {
                    alert('Please make sure all options are different.');
                    return;
                }

                // Check if the answer is one of the options
                if (!options.includes(answer)) {
                    alert('Please make sure the answer is one of the options.');
                    return;
                }

                // If options are different and answer is valid, add the question
                setQuestions([
                    ...questions,
                    {
                        questionName,
                        options,
                        answer,
                        imageUrl: image,
                    },
                ]);
                setQuestionName('');
                setOptions(['', '', '', '']);
                setAnswer('');
                setImage('');
            } else {
                alert('Please upload a valid Image Url');
                setImage('');
            }
        } else {
            // Check if all options are different
            if (new Set(options).size !== options.length) {
                alert('Please make sure all options are different.');
                return;
            }

            // Check if the answer is one of the options
            if (!options.includes(answer)) {
                alert('Please make sure the answer is one of the options.');
                return;
            }

            // If options are different and answer is valid, add the question
            setQuestions([
                ...questions,
                {
                    questionName,
                    options,
                    answer,
                    imageUrl: image,
                },
            ]);
            setQuestionName('');
            setOptions(['', '', '', '']);
            setAnswer('');
            setImage('');
        }
    };


    return (

        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Add a New Quiz
                    </Typography>

                    <TextField
                        className="m-2"
                        fullWidth
                        label="Quiz Name"
                        value={QuizName}
                        onChange={(e) => setQuizName(e.target.value)}
                        variant="outlined"
                    />

                    {/* Typography for Time Duration */}

                    <TextField
                        className="m-2"
                        fullWidth
                        label="Time Duration"
                        value={timeDuration}
                        onChange={(e) => setTimeDuration(e.target.value)}
                        variant="outlined"
                    />

                    {/* Typography for Date */}

                    {/* You can replace the following DatePicker with your preferred date picker component */}
                    <TextField
                        className="m-2"
                        fullWidth
                        label="Date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        variant="outlined"
                    />

                    <TextField
                        className="m-2"
                        fullWidth
                        label="Question Title"
                        value={questionName}
                        onChange={(e) => setQuestionName(e.target.value)}
                        variant="outlined"
                    />
                    {[1, 2, 3, 4].map((index) => (
                        <TextField
                            key={index}
                            className="m-2"
                            fullWidth
                            label={`Option ${index}`}
                            value={options[index - 1]}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index - 1] = e.target.value;
                                setOptions(newOptions);
                            }}
                            variant="outlined"
                        />
                    ))}
                    <TextField
                        className="m-2"
                        fullWidth
                        label="Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        variant="outlined"
                    />
                    <TextField
                        className="m-3"
                        fullWidth
                        label="Image URL (Optional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        variant="outlined"
                    />
                    <Button
                        onClick={addQuestion}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        style={{marginTop: '20px'}}
                    >
                        Add Question
                    </Button>
                    <Paper style={{marginTop: '20px'}}>
                        <CardContent>
                            <Typography variant="h6">Questions (you are adding)</Typography>
                            {questions.map((question, index) => (
                                <div key={index} className="m-2">
                                    <Typography variant="body1">
                                        <strong className="text-red-300">{index + 1}. Question Name:</strong>{' '}
                                        {question.questionName}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong className="text-red-300">Options:</strong> {question.options.join(', ')}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong className="text-red-300">Answer:</strong> {question.answer}
                                    </Typography>
                                    {question.imageUrl && (
                                        <img
                                            src={question.imageUrl}
                                            alt={question.questionName}
                                            style={{maxWidth: '100%', maxHeight: '200px', marginTop: '10px'}}
                                        />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Paper>
                    {questions.length !== 0 ? (
                        <>
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                style={{marginTop: '20px'}}
                            >
                                Add Content
                            </Button>
                        </>
                    ) : (
                        ''
                    )}
                </CardContent>
                <ToastContainer />
            </Card>
        </>


    );
};
export default CreateQuiz;
