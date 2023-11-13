import React, {useState} from 'react';
import {Typography, Grid, Card, CardContent, TextField, IconButton, Button} from '@mui/material';
import {Delete, Edit, Topic} from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import downloadBulkDataWithStyle from './Functionality/downloadFiles/downloadBulkData';
import {Link} from 'react-router-dom';
const Box = ({title, elem, courseName, sectionId, TopicId}) => {
    const [isAdmin, SetIsAdmin] = useState(true);
    const [updateVale, setUpdateValue] = useState("");
    const [isEditing, setInputStatus] = useState(false);
    const handleDelete = (name, sectionId, TopicId) => {
        if (title === 'course') {
            console.log(name);
        }

        else if (title === "section") {
            console.log(name, sectionId);
        }

        else {
            console.log(name, sectionId, TopicId);
        }



    };
    const handleUpdate = async (name, sectionId, TopicId) => {
        setInputStatus(true);
    };

    const handleDone = async (name, sectionId, TopicId) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        if (title === 'course') {
            let bodyContent = JSON.stringify({
                updatedValue: updateVale,
                courseName: name
            });
            const result = await fetch('http://localhost:8000/course/update', {
                method: 'Put',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                alert("Successfully Updated");
            }
        }

        else if (title === "section") {
            let bodyContent = JSON.stringify({
                updatedValue: updateVale,
                courseName: name,
                sectionId: sectionId
            });
            const result = await fetch('http://localhost:8000/course/section/update', {
                method: 'Put',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                alert("Successfully Updated");
            }
        }

        else {
            let bodyContent = JSON.stringify({
                updatedValue: updateVale,
                courseName: name,
                sectionId: sectionId,
                topicId: TopicId
            });
            const result = await fetch('http://localhost:8000/course/section/topic/update', {
                method: 'Put',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                alert("Successfully Updated");
            }
        }
        setInputStatus(false);
    };
    const date = new Date(elem.createdDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    return (
        <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card elevation={3} className="h-full flex flex-col">
                <Link to={`/course/${elem.name}`}>
                    {/* <CardMedia
                                            component="img"
                                            style={{
                                                height: '150px',
                                                objectFit: 'cover',
                                                maxWidth: '100%',
                                                borderRadius: '20px',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                            }}
                                            //  image={`/Image/Course/course${Math.floor(Math.random() * 8)}.jpg`}
                                        /> */}
                </Link>
                <CardContent className="flex-1 text-center">
                    <Typography variant="h6" component="h2" className="mb-2 text-gray-800">
                        {isEditing ? (
                            <TextField
                                variant="outlined"
                                fullWidth
                                defaultValue={elem.name}
                                onChange={(e) => setUpdateValue(e.target.value)}
                            />
                        ) : (
                            title === 'course' ? (
                                <Link to={`/course/${elem.name}`} className="hover:text-indigo-500 active:text-indigo-600">
                                    {elem.name}
                                </Link>
                                
                            ) : title === 'section' ? (
                                <Link to={`/course/${courseName}/${elem._id}/`} className="hover:text-indigo-500 active:text-indigo-600">
                                    {elem.name}
                                </Link>

                            ) : (
                                <>
                                <Link to={`/course/${courseName}/${sectionId}/${elem._id}`} className="hover:text-indigo-500 active:text-indigo-600">
                                    {elem.name}
                                </Link>
                                <IconButton color="primary" onClick={() => downloadBulkDataWithStyle(elem)}>
                            <CloudDownloadIcon />
                        </IconButton>
                                </>
                                
                            )
                        )}
                    </Typography>

                    <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center gap-2">
                            <div>
                                <span className="block text-indigo-500">CreatedAt:</span>
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <span className="block text-indigo-500">Sections</span>
                                {
                                    title === 'course'
                                        ? elem.totalSections
                                        : title === 'section'
                                            ? elem.Topics
                                            : elem.content.length
                                }
                            </div>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="mt-3">
                            {title === 'course' && (
                                <>
                                    { /* If editing is not in progress, show the Edit button */}
                                    {!isEditing && (
                                        <>
                                            <IconButton color="primary" onClick={() => handleUpdate(elem.name)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(elem.name)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                    { /* If editing is in progress, show the Done button */}
                                    {isEditing && (
                                        <>
                                            <IconButton color="success" onClick={() => handleDone(elem.name)}>
                                                <DoneIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                            {title === 'section' && (
                                <>
                                    {!isEditing && (
                                        <>
                                            <IconButton color="primary" onClick={() => handleUpdate(courseName, elem._id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(courseName, elem._id)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                    {isEditing && (
                                        <>
                                            <IconButton color="success" onClick={() => handleDone(courseName, elem._id)}>
                                                <DoneIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                            {title === 'topic' && (
                                <>
                                    {!isEditing && (
                                        <>
                                            <IconButton color="primary" onClick={() => handleUpdate(courseName, sectionId, elem._id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(courseName, sectionId, elem._id)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                    {isEditing && (
                                        <>
                                            <IconButton color="success" onClick={() => handleDone(courseName, sectionId, elem._id)}>
                                                <DoneIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                </CardContent>
            </Card>
        </Grid>
    );
};

export default Box;