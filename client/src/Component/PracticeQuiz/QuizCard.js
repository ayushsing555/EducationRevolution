import React, {useState} from 'react';
import {Card, Typography, CardContent, Button, IconButton, Grid} from '@mui/material';
import {TextField, Tooltip} from '@mui/material';
import {Share} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const QuizCard = ({title, elem, courseName, sectionId, TopicId}) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  const [isEditing, setInputStatus] = useState(false);
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
          <CircularProgress sx={{margin: 'auto'}} />
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
              <Typography variant="h6" component="h2" sx={{mb: 2, color: '#333'}}>
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
                      <Link to={`/course/${courseName}/quizes/${elem._id}`}>
                        <Button variant="contained" color="primary" >
                          Go To Quiz
                        </Button>
                      </Link>
                    </>
                  ) : title === 'section' ? (
                    <>
                      {elem.QuizName}
                      <Tooltip title="Copy Link" arrow>
                        <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${elem.name}`)}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                      <Link to={`/course/${courseName}/${sectionId}/quizes/${elem._id}`}>
                        <Button variant="contained" color="primary">
                          Go To Quiz
                        </Button>
                      </Link>

                    </>
                  ) : (
                    <>
                      {elem.QuizName}
                      <Tooltip title="Copy Link" arrow>
                        <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${courseName}/${sectionId}/${elem._id}`)}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                      <Link to={`/course/${courseName}/${sectionId}/${TopicId}/quizes/${elem._id}`}>
                        <Button variant="contained" color="primary">
                          Go To Quiz
                        </Button>
                      </Link>

                    </>
                  )
                )}
              </Typography>
            </CardContent>
            
          </>
        )}
      </Card>
      <ToastContainer />
    </Grid>
  );
};

export default QuizCard;
