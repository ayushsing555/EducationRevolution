// src/components/.js

import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { GitHub, Mail, Assessment, Alarm, Assignment, Person } from '@mui/icons-material';

const About = () => {
  return (
    <Container>
      <Typography variant="h1" align="center" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        About Our Platform
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>
              For Users
            </Typography>
            <Typography variant="body1">
              Users can efficiently access and share study materials, download notes, and participate in quizzes.
              <br />
              <Button startIcon={<Assignment />} variant="contained" color="primary">
                Explore Materials
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>
              For Admins
            </Typography>
            <Typography variant="body1">
              Admins can manage courses, sections, topics, quizzes, and automate follow-ups.
              <br />
              <Button startIcon={<Assessment />} variant="contained" color="primary">
                Admin Dashboard
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h2" align="center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        Key Features
      </Typography>
      <Grid container spacing={3}>
        {/* Add more feature cards here */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Daily Quiz
            </Typography>
            <Typography variant="body2">
              Attempt daily quizzes, earn coins, and track your progress.
              <br />
              <Button startIcon={<Alarm />} variant="contained" color="primary">
                Start Quiz
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Scheduled Quiz
            </Typography>
            <Typography variant="body2">
              Participate in scheduled quizzes and compete with others.
              <br />
              <Button startIcon={<Assignment />} variant="contained" color="primary">
                View Schedule
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Analysis
            </Typography>
            <Typography variant="body2">
              Receive detailed analysis and rankings for quizzes.
              <br />
              <Button startIcon={<Assessment />} variant="contained" color="primary">
                View Analysis
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Add more sections for additional content and features as needed */}

      <Typography variant="h2" align="center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        Automation (Coming Soon)
      </Typography>
      <Grid container spacing={3}>
        {/* Add automation features here */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Email Reminders
            </Typography>
            <Typography variant="body2">
              Automated emails for scheduled quizzes and inactive users.
              <br />
              <Button startIcon={<Mail />} variant="contained" color="primary">
                Learn More
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              User Engagement
            </Typography>
            <Typography variant="body2">
              Follow-ups and reminders to keep users engaged.
              <br />
              <Button startIcon={<Person />} variant="contained" color="primary">
                Explore Engagement
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Scheduled Tests
            </Typography>
            <Typography variant="body2">
              Automated reminders for scheduled tests.
              <br />
              <Button startIcon={<Alarm />} variant="contained" color="primary">
                View Schedule
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h2" align="center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        Contact Us
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              GitHub
            </Typography>
            <Typography variant="body2">
              Connect with us on GitHub for updates and contributions.
              <br />
              <Button
                startIcon={<GitHub />}
                variant="contained"
                color="primary"
                href="https://github.com/your-github-repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: '1rem' }}>
              Email
            </Typography>
            <Typography variant="body2">
              For inquiries and support, reach out via email.
              <br />
              <Button
                startIcon={<Mail />}
                variant="contained"
                color="primary"
                href="mailto:your-email@example.com"
              >
                Email Us
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
