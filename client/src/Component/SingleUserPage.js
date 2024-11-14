import React, {useEffect, useState} from 'react';
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
  Checkbox,
  FormControlLabel,
  TextareaAutosize
} from '@material-ui/core';
import {userDetailById} from './ApiFunctions/getUsers';
import 'react-toastify/dist/ReactToastify.css';


import {toast, ToastContainer} from 'react-toastify';
import {Typography} from '@mui/material';

import {Email as EmailIcon, Add as AddIcon} from '@material-ui/icons';
import {useParams} from 'react-router-dom';

const SingleUserPage = () => {
  const [sendToAllStudent, setSendToAllStudent] = useState(false);
  const {id} = useParams();
  const [userDetails, setUserDetails] = useState({
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await userDetailById(id);
      setUserDetails(data);
    };
    getUserDetails();
  }, []);

  const [permissions, setPermissions] = useState({
    emailPermission: true,
  });

  const emailSubjects = ['Meeting Tomorrow', 'Project Update', 'Feedback Request', 'Event Invitation', 'Important Announcement', 'Weekly Newsletter'];

  const [customEmail, setCustomEmail] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const initialEmailTemplate = `Dear [User],

I hope this email finds you well. [Customize the content as needed.]

Sincerely,
[Your Name]`;


  const handleSendAllStudents = () => {
    setSendToAllStudent(!sendToAllStudent);
    console.log(sendToAllStudent);
  };

  const handleSendEmail = async (subject) => {
    // Implement email sending logic here
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
      "email": id,
      "subject": subject,
      'AllStudents': sendToAllStudent
    });

    let response = await fetch("https://educationrevolution-1.onrender.com/SendSujectEmail", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    const data = await response.json();
    if (data.result) {
      toast.success('Successfully Email Sent', {
        position: 'bottom-right',
        autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
      });

    }
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
    <>
      <div style={{padding: '20px'}}>
        <Paper style={{padding: '20px', marginBottom: '20px', textAlign: 'center'}}>
          <Typography variant="h4">{userDetails.name}</Typography>
          <Typography variant="body1" style={{marginTop: '10px'}}>
            <strong>Email:</strong> {userDetails.email}
          </Typography>
          <Typography variant="body1">
            {/* <strong>Created Date:</strong> {userDetails.createdDate} */}
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
            >
              Send Custom Email
            </Button>
          </Grid>
        </Paper>

        <TableContainer component={Paper} style={{margin: 'auto'}}>
          <Paper style={{padding: '20px', marginBottom: '20px', textAlign: 'center'}}>
            <Typography variant="h6">Email Activity</Typography>
            <b>Send to All Students</b>
            <Checkbox
              value={sendToAllStudent}
              label='Send to All Student'
              color="primary"
              onChange={handleSendAllStudents}
            />
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
                    >
                      Send Email
                    </Button>
                  </TableCell>
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
      <ToastContainer />
    </>
  );
};

export default SingleUserPage;
