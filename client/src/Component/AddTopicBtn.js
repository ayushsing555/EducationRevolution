import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { AddTopicApi } from './ApiFunctions/AddCourseApi';
import { Button, Typography, TextField, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalStyles } from './Styles/modelStylles';
const AddSectionBtn = ({ part, course, section }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [topicName, setTopicName] = useState('');
  console.log(section)
  if (section == null || course == null) {
    return null;
  }

  const handleSubmit = async (e) => {
    let result = AddTopicApi(course.label, section.value, topicName);
    if (result) {
      setModalOpen(false);
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
        <Button
          onClick={openModal}
          variant="contained"
          color="primary"
          style={{ margin: '10px' }}
        >
          Add Topic
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
              label="Section Name"
              value={section.label}
              variant="outlined"
              disabled
            />
            <TextField
              fullWidth
              label={`${part} Name`}
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              variant="outlined"
            />
            <div style={{ marginTop: '20px' }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
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
