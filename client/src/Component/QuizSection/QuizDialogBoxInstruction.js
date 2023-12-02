import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const QuizDialogBox = ({open, handleClose, goToQuiz, isCurrentDay}) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle style={{backgroundColor: '#2196f3', color: '#fff'}}>
                Quiz Instructions
            </DialogTitle>
            <DialogContent style={{padding: '20px'}}>
                <DialogContentText>
                    <strong>1.</strong> You have 12 minutes to complete the quiz.
                    <br />
                    {
                        isCurrentDay ? <>
                            <strong>2.</strong> You can only attempt the quiz once per day.
                            <br />
                        </> : ""
                    }

                    <strong>3.</strong> The quiz will auto-submit if time runs out or if you switch tabs.
                    <br />
                    <strong>4.</strong> Your score will be displayed after submitting the quiz.
                    <br />
                    <strong>5.</strong> Click the "Start Quiz" button to begin. Your time starts once you click.
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{padding: '20px', justifyContent: 'center'}}>
                <Link to={`/dailyQuiz/${goToQuiz}`}>
                    <Button variant="contained" color="primary">
                        Start Quiz
                    </Button>
                </Link>
                <Button onClick={handleClose} variant="outlined" color="secondary" style={{marginLeft: '10px'}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizDialogBox;
