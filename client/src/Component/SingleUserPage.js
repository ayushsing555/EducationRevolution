import React, {useState} from 'react';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import { Typography } from '@mui/material';

import {Email as EmailIcon, Add as AddIcon} from '@material-ui/icons';

const SingleUserPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdDate: '2023-01-01',
  });

  const [permissions, setPermissions] = useState({
    emailPermission: false,
  });

  const [activities, setActivities] = useState([
    {id: 1, courseName: 'React Basics', sectionName: 'Introduction', date: '2023-01-05'},
    {id: 2, courseName: 'React State', sectionName: 'Managing State', date: '2023-01-10'},
  ]);

  const emailSubjects = ['Meeting Tomorrow', 'Project Update', 'Feedback Request', 'Event Invitation', 'Important Announcement', 'Weekly Newsletter'];

  const [customEmail, setCustomEmail] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const initialEmailTemplate = `Dear [User],

I hope this email finds you well. [Customize the content as needed.]

Sincerely,
[Your Name]`;

  const handleSendEmail = (subject) => {
    // Implement email sending logic here
    console.log(`Email sent with subject: ${subject}`);
  };

  const handleSendCustomEmail = () => {
    // Implement custom email sending logic here
    console.log(`Custom Email sent: Subject - ${customSubject}, Content - ${customEmail}`);
    handleCloseDialog();
  };

  const handleGrantPermission = () => {
    setPermissions({...permissions, emailPermission: true});
  };

  const handleCancelPermission = () => {
    setPermissions({...permissions, emailPermission: false});
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{padding: '20px'}}>
      <Paper style={{padding: '20px', marginBottom: '20px', textAlign: 'center'}}>
        <Typography variant="h4">{userDetails.name}</Typography>
        <Typography variant="body1" style={{marginTop: '10px'}}>
          <strong>Email:</strong> {userDetails.email}
        </Typography>
        <Typography variant="body1">
          <strong>Created Date:</strong> {userDetails.createdDate}
        </Typography>
        <Grid item style={{marginTop: '20px'}}>
          {permissions.emailPermission ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelPermission}
            >
              Cancel Permission
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{backgroundColor: 'green', color: 'white', marginLeft: '10px'}}
              onClick={handleGrantPermission}
            >
              Grant Permission
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{marginLeft: '10px'}}
            onClick={handleClickOpenDialog}
            disabled={!permissions.emailPermission}
          >
            Send Custom Email
          </Button>
        </Grid>
      </Paper>

      <TableContainer component={Paper} style={{margin: 'auto'}}>
      <Paper style={{padding: '20px', marginBottom: '20px', textAlign: 'center'}}>
          <Typography variant="h6">Email Activity</Typography>
        </Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Email Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emailSubjects.map((subject) => (
              <TableRow key={subject}>
                <TableCell>{subject}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginTop: '10px'}}
                    onClick={() => handleSendEmail(subject)}
                    disabled={!permissions.emailPermission}
                  >
                    Send Email
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




      <TableContainer component={Paper}>
        <Paper style={{padding: '20px', marginBottom: '20px', textAlign: 'center'}}>
          <Typography variant="h6">User Activity on Courses</Typography>
        </Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Section Name</TableCell>
              <TableCell>Date of Read</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.courseName}</TableCell>
                <TableCell>{activity.sectionName}</TableCell>
                <TableCell>{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Custom Email */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Send Custom Email</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            style={{marginBottom: '10px'}}
          />
          <TextareaAutosize
            rowsMin={5}
            placeholder="Write your email here..."
            value={customEmail}
            onChange={(e) => setCustomEmail(e.target.value)}
            style={{width: '100%', marginBottom: '10px'}}
          >
            {initialEmailTemplate}
          </TextareaAutosize>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendCustomEmail} color="primary" disabled={!permissions.emailPermission}>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SingleUserPage;
