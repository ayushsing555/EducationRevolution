import React from 'react';
import {Container, Typography, Grid, Paper} from '@mui/material';
import {GitHub, Email, Quiz, Analytics, AlarmOn, School, Person} from '@mui/icons-material';
import {useSpring, animated} from 'react-spring'; // For animations

const About = () => {
  // Animation setup
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
            fontFamily: 'Roboto, sans-serif',
            mt: 4,
            mb: 4,
            fontWeight: 'bold',
            color: '#3F51B5', // Blue shade for headers
          }}
        >
          About Our Platform
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
              <Person sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  color: '#3F51B5',
                }}
              >
                For Users
              </Typography>
              <Typography variant="body1">
                As a user, you gain access to a comprehensive set of features tailored to enhance your learning experience. Seamlessly share study materials, download notes, and participate in quizzes to assess your knowledge.
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
              <School sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  color: '#3F51B5',
                }}
              >
                For Admins
              </Typography>
              <Typography variant="body1">
                Admins wield powerful tools to manage courses, sections, topics, and quizzes effortlessly. Automation features allow admins to streamline processes, including follow-ups and reminders to keep user engagement high.
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
            color: '#3F51B5',
          }}
        >
          Key Features
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <Quiz sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography variant="h5" sx={{color: '#3F51B5'}}>
                Daily Quiz
              </Typography>
              <Typography variant="body2">
                Engage in daily quizzes to test your knowledge, earn coins, and track your progress over time. These quizzes are designed to reinforce daily learning habits.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <AlarmOn sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography variant="h5" sx={{color: '#3F51B5'}}>
                Scheduled Quiz
              </Typography>
              <Typography variant="body2">
                Participate in scheduled quizzes where you can compete with others. These quizzes are structured to assess your skills within a specific time frame.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <Analytics sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography variant="h5" sx={{color: '#3F51B5'}}>
                Analysis
              </Typography>
              <Typography variant="body2">
                Receive detailed analysis and rankings for each quiz attempt. Understand your strengths and areas for improvement.
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
            color: '#3F51B5',
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <GitHub sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography variant="h5" sx={{color: '#3F51B5'}}>
                GitHub
              </Typography>
              <Typography variant="body2">
                Connect with us on GitHub for updates and contributions. We welcome feedback and contributions.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                textAlign: 'center',
                backgroundColor: '#E3F2FD',
              }}
            >
              <Email sx={{fontSize: '2rem', color: '#3F51B5', mb: 2}} />
              <Typography variant="h5" sx={{color: '#3F51B5'}}>
                Email
              </Typography>
              <Typography variant="body2">
                For inquiries and support, feel free to reach out via email. We're dedicated to addressing your concerns.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </animated.div>
    </Container>
  );
};

export default About;
