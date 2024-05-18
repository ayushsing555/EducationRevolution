import React from 'react';
import {Container, Typography, Button, Grid, Paper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBook,
  faUsers,
  faClock,
  faChartBar,
  faTrophy,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import {useSpring, animated} from 'react-spring'; // For animations

const Home = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: {opacity: 0},
    config: {duration: 500},
  });

  return (
    <Container>
      <animated.div style={fadeIn}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            mt: 4,
            mb: 4,
            fontFamily: 'Pacifico, cursive',
            color: '#3F51B5', // Blue for primary headers
          }}
        >
          Welcome to Education-Revolution
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD', // Light blue background
              }}
            >
              <FontAwesomeIcon
                icon={faBook}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontFamily: 'Roboto, sans-serif',
                  color: '#3F51B5',
                }}
              >
                Explore Learning Materials
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Access a rich repository of study materials and download notes. Dive into a world of knowledge at your fingertips. Our platform provides a wide range of resources for various subjects and topics.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faBook} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  Explore Materials
                </Button>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <FontAwesomeIcon
                icon={faUsers}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontFamily: 'Roboto, sans-serif',
                  color: '#3F51B5',
                }}
              >
                Join a Vibrant Community
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Connect with other learners, share insights, and collaborate on projects. Education-Revolution is more than just a platform; it's a thriving community where learners support and inspire each other.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faUsers} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  Join Now
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography
          variant="h2"
          align="center"
          sx={{
            mt: 6,
            mb: 4,
            fontFamily: 'Pacifico, cursive',
            color: '#3F51B5',
          }}
        >
          Key Features
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#3F51B5',
                  mb: 2,
                }}
              >
                Daily Quizzes for Mastery
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Challenge yourself with daily quizzes, earn coins, and track your progress. Reinforce your learning habits with our engaging quizzes designed to test and improve your understanding of various subjects.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faClock} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  Start Quiz
                </Button>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <FontAwesomeIcon
                icon={faChartBar}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  color: '#3F51B5',
                  mb: 2,
                }}
              >
                In-Depth Analysis
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Receive detailed analysis and rankings for each quiz attempt. Understand your strengths and areas for improvement to optimize your study strategy. Our analysis tools help you identify the topics that need more focus.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faChartBar} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  View Analysis
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <FontAwesomeIcon
                icon={faSchool}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h5"
                sx={{color: '#3F51B5', fontFamily: 'Roboto, sans-serif', mb: 2}}
              >
                Expert-Led Courses
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Learn from industry experts with our carefully curated courses. Expand your knowledge with lessons designed to help you excel in your field.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faSchool} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  Explore Courses
                </Button>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} mt={2}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <FontAwesomeIcon
                icon={faTrophy}
                style={{fontSize: '2rem', color: '#3F51B5', mb: 2}}
              />
              <Typography
                variant="h5"
                sx={{color: '#3F51B5', fontFamily: 'Roboto, sans-serif', mb: 2}}
              >
                Competitions and Challenges
              </Typography>
              <Typography variant="body1" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                Engage in exciting competitions and challenges with other learners. Test your skills and earn recognition for your achievements.
                <br />
                <Button
                  startIcon={<FontAwesomeIcon icon={faTrophy} />}
                  variant="contained"
                  color="primary"
                  sx={{mt: 2}}
                >
                  Join Competitions
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </animated.div>
    </Container>
  );
};

export default Home;
