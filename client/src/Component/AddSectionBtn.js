import React from 'react';
import {useState} from 'react';
import Modal from 'react-modal';
import {AddSectionApi} from './ApiFunctions/AddCourseApi';
import {Button, Typography, TextField, Card, CardContent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {modalStyles} from './Styles/modelStylles';
const AddSectionBtn = ({part, course, refreshData}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [sectionName, setSectionName] = useState('');

  if (course === null) {
    return null;
  }

  const handleSubmit = async () => {
    if (course == null || sectionName === '') {
      return alert('Please enter valid values.');
    }
    let result = AddSectionApi(course.label, sectionName);
    if (result) {
      setModalOpen(false);
      refreshData();
    }

  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <Button onClick={openModal} variant="contained" color="primary" style={{margin: '10px'}}>
          Add Section
        </Button>
      </div>
      <Modal isOpen={isModalOpen} style={modalStyles}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Add a New {part}
            </Typography>
            <TextField
              fullWidth
              label="Course Name"
              value={course.label}
              variant="outlined"
              disabled
            />
            <TextField
              fullWidth
              label={`Section Name`}
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              variant="outlined"
            />
            <div style={{marginTop: '20px'}}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{marginRight: '10px'}}
              >
                Add
              </Button>
              <Button onClick={closeModal} variant="contained" color="secondary">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};


export default AddSectionBtn;
