import React, {useState} from 'react';
import Modal from 'react-modal';
import {modalStyles} from './Styles/modelStylles';
import {
    Button,
    Typography,
    TextField,
    Card,
    Paper,
    CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {AddContentApi} from './ApiFunctions/AddCourseApi';


const AddContentBtn = ({part, course, section, Topic,refreshData}) => {
    console.log(course,section,Topic);
    const [isModalOpen, setModalOpen] = useState(false);
    const [subtopics, setSubtopics] = useState([]);
    const [subtopicName, setSubtopicName] = useState('');
    const [subtopicContent, setSubtopicContent] = useState('');
    const [image, setImage] = useState('');

    if (section == null || course == null || Topic == null) {
        return null;
    }

    const handleSubmit = async (e) => {
        if (subtopics.length === 0) {
            return alert("Please add Some content");
        }
        let result = AddContentApi(subtopics, section, Topic, course);
        if (result)
            setSubtopics([]);
        if(part==='ContentPage'){
            refreshData();
        }
        // Handle your form submission here
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setSubtopics([]);
        setModalOpen(false);
    };

    const addSubtopic = () => {
        if (subtopicName && subtopicContent) {
            setSubtopics([
                ...subtopics,
                {
                    name: subtopicName,
                    content: subtopicContent,
                    url: image
                },
            ]);
            setSubtopicName('');
            setSubtopicContent('');
            setImage('');
        }
    };


    return (
        <>
            <div>
                <Button onClick={openModal} variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Content
                </Button>
            </div>
            <Modal isOpen={isModalOpen} style={modalStyles}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add a New Content
                        </Typography>
                        <TextField className='m-2' fullWidth label="Course Name" value={course.label} variant="outlined" disabled />
                        <TextField className='m-2' fullWidth label="Section Name" value={section.label} variant="outlined" disabled InputProps={{
                            style: {fontWeight: 'bold0', color: 'black'},
                        }} />
                        <TextField className='m-2' fullWidth label={`${part} Name`} value={Topic.label} variant="outlined" disabled InputProps={{
                            style: {fontWeight: 'bold0', color: 'black'},
                        }} />
                        <TextField className='m-2' fullWidth label="Subtopic Name" value={subtopicName} onChange={(e) => setSubtopicName(e.target.value)} variant="outlined" />
                        <TextField className='m-2'
                            fullWidth
                            label="Subtopic Content"
                            multiline
                            rows={4}
                            value={subtopicContent}
                            onChange={(e) => setSubtopicContent(e.target.value)}
                            variant="outlined"
                        />
                        <TextField className='m-3' fullWidth label="Image URL(Optional)" value={image} onChange={(e) => setImage(e.target.value)} variant="outlined" />
                        <Button onClick={addSubtopic} variant="contained" color="primary" startIcon={<AddIcon />} style={{marginTop: '20px'}}>
                            Add sub
                        </Button>
                        <Paper style={{marginTop: '20px'}}>
                            <CardContent>
                                <Typography variant="h6">Subtopics (you are adding)</Typography>
                                {subtopics.map((subtopic, index) => (
                                    <div key={index} className='m-2'>
                                        <Typography variant="body1">
                                            <strong className='text-red-300'>{index + 1}. SubTopicName:</strong> {subtopic.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong className='text-red-300'>Detail:</strong> {
                                                subtopic.content.length > 10 ? subtopic.content.substring(0, 10) + "..." : subtopic.content
                                            }
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong className='text-red-300'>ImageUrl:</strong> {
                                                subtopic.url.length > 10 ? subtopic.url.substring(0, 10) + "..." : subtopic.url
                                            }
                                        </Typography>
                                        {/* Add image display here */}
                                    </div>
                                ))}
                            </CardContent>
                        </Paper>
                        {
                            subtopics.length !== 0 ? <>
                                <Button onClick={handleSubmit} variant="contained" color="primary" startIcon={<AddIcon />} style={{marginTop: '20px'}}>
                                    Add Content
                                </Button>
                            </> : ""
                        }


                        <Button onClick={closeModal} variant="contained" color="secondary" style={{marginTop: '20px'}}>
                            Close
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
};



export default AddContentBtn;