import React, {useState} from 'react';
import Modal from 'react-modal';
import {modalStyles} from '../Styles/modelStylles';
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
import {isValidImage} from '../Functionality/ValidityFunction/isValidImage';
import {AddQuizCourse} from '../ApiFunctions/AddQuizApi';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
const AddCourseQuizBtn = ({part, course, refreshData}) => {
    console.log(course);
    const [isModalOpen, setModalOpen] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionName, setQuestionName] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState('');
    const [QuizName, setQuizName] = useState('');
    // console.log(questions);
    if (course == null) {
        return null;
    }

    const handleSubmit = async (e) => {
        if (questions.length === 0) {
            return alert('Please add at least one question');
        }
        if (QuizName === '') {
            return alert("Please give a Quiz Name");
        }

        let result = AddQuizCourse(questions, course.label, QuizName);
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


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setQuestions([]);
        setModalOpen(false);
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
            <div>
                <Button onClick={openModal} variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Quiz
                </Button>
            </div>
            <Modal isOpen={isModalOpen} style={modalStyles}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add a New Question
                        </Typography>
                        <TextField
                            className="m-2"
                            fullWidth
                            label="Course Name"
                            value={course.label}
                            variant="outlined"
                            disabled
                        />


                        <TextField
                            className="m-2"
                            fullWidth
                            label="Quiz Name"
                            value={QuizName}
                            onChange={(e) => setQuizName(e.target.value)}
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
                        <Button onClick={closeModal} variant="contained" color="secondary" style={{marginTop: '20px'}}>
                            Close
                        </Button>
                    </CardContent>
                    <ToastContainer />
                </Card>
            </Modal>
        </>
    );
};
export default AddCourseQuizBtn;
