import React from 'react';
import {useState} from 'react';
import Modal from 'react-modal';
import {AddCourseApi} from './ApiFunctions/AddCourseApi';
import {Button, Typography, TextField, Card, CardContent} from '@mui/material';
import {modalStyles} from './Styles/modelStylles';
const AddCourseBtn = ({part}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');

    const handleSubmit = async (e) => {
            let result = await AddCourseApi(courseName);
            if (result) {
                setModalOpen(false);
            } else {
                alert('Something went wrong');
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
                    style={{margin: '10px'}}
                >
                    Add {part}
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
                            label={`Course Name`}
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
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



export default AddCourseBtn;
