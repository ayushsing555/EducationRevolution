import React, { useState } from 'react';
import { Card, Typography, CardContent, Button, IconButton, Grid } from '@mui/material';
import { TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Share } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoneIcon from '@mui/icons-material/Done';

const QuizCard = ({ title, elem, courseName, sectionId, TopicId }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [isEditing, setInputStatus] = useState(false);

  const handleStartQuiz = () => {
    // Add logic to start the quiz
    console.log('Quiz started!');
  };

  const LinkCopy = (linkToCopy) => {
    const textarea = document.createElement('textarea');
    textarea.value = linkToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success('Link Copied!', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleDelete = () => {
    // Add logic for deletion
  };

  const handleUpdate = () => {
    // Add logic for update
  };

  const handleDone = () => {
    // Add logic for done
  };

  return (
    <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#f0f0f0', // Background color
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : (
          <>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#333' }}>
                  {isEditing ? (
                    <TextField
                      variant="outlined"
                      fullWidth
                      defaultValue={elem.name}
                      onChange={(e) => setUpdateValue(e.target.value)}
                    />
                  ) : (
                    title === 'course' ? (
                      <>
                        {elem.QuizName}
                        <Tooltip title='Copy Link'>
                          <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${elem.name}`)}>
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : title === 'section' ? (
                      <>
                        {elem.QuizName}
                        <Tooltip title="Copy Link" arrow>
                          <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${elem.name}`)}>
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        {elem.QuizName}
                        <Tooltip title="Copy Link" arrow>
                          <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${courseName}/${sectionId}/${elem._id}`)}>
                            <Share />
                          </IconButton>
                        </Tooltip>
                      </>
                    )
                  )}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleStartQuiz}>
                  Go To Quiz
                </Button>
              </CardContent>
            {isAdmin && (
              <div
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                {title === 'course' && (
                  <>
                    {!isEditing && (
                      <>
                        <Tooltip title='Update'>
                          <IconButton color="primary" onClick={() => handleUpdate(elem.name)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>
                          <IconButton color="error" onClick={() => handleDelete(elem.name)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <Tooltip title='Done'>
                          <IconButton color="success" onClick={() => handleDone(elem.name)}>
                            <DoneIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </>
                )}
                {title === 'section' && (
                  <>
                    {!isEditing && (
                      <>
                        <IconButton color="primary" onClick={() => handleUpdate(courseName, elem._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(courseName, elem._id)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <IconButton color="success" onClick={() => handleDone(courseName, elem._id)}>
                          <DoneIcon />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
                {title === 'topic' && (
                  <>
                    {!isEditing && (
                      <>
                        <IconButton color="primary" onClick={() => handleUpdate(courseName, sectionId, elem._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(courseName, sectionId, elem._id)}>
                          <Delete />
                        </IconButton>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <IconButton color="success" onClick={() => handleDone(courseName, sectionId, elem._id)}>
                          <DoneIcon />
                        </IconButton>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </Card>
      <ToastContainer />
    </Grid>
  );
};

export default QuizCard;
