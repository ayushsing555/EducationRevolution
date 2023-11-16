import React, {useState} from 'react';
import {Typography, Grid, Card, CardContent, TextField, IconButton, Button} from '@mui/material';
import {Delete, Edit, Share, Topic} from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import downloadBulkDataWithStyle from './Functionality/downloadFiles/downloadBulkData';
import {Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Box = ({title, elem, courseName, sectionId, TopicId, refreshData}) => {
    const [isAdmin, SetIsAdmin] = useState(true);
    const [isLoading, SetIsloading] = useState(false);
    const [updateVale, setUpdateValue] = useState("");
    const [isEditing, setInputStatus] = useState(false);
    const handleDelete = async (name, sectionId, TopicId) => {
        SetIsloading(true);
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        if (title === 'course') {
            let bodyContent = JSON.stringify({
                name: name
            });
            const result = await fetch('http://localhost:8000/course/delete', {
                method: 'delete',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                refreshData();
                SetIsloading(false);
            }

        }

        else if (title === "section") {
            console.log(title);
            let bodyContent = JSON.stringify({
                name: name,
                sectionId: sectionId,
            });
            const result = await fetch('http://localhost:8000/course/section/delete', {
                method: 'delete',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                refreshData();
                SetIsloading(false);
            }
        }

        else {
            let bodyContent = JSON.stringify({
                name: name,
                sectionId: sectionId,
                topicId: TopicId
            });
            const result = await fetch('http://localhost:8000/course/section/topic/delete', {
                method: 'delete',
                body: bodyContent,
                headers: headersList
            });

            const data = await result.json();
            if (data.success) {
                refreshData();
                SetIsloading(false);
            }
        }

    };
    const handleUpdate = async (name, sectionId, TopicId) => {
        setInputStatus(true);
    };

    const handleDone = async (name, sectionId, TopicId) => {
        SetIsloading(true);
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
                refreshData();
                SetIsloading(false);
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
                refreshData();
                SetIsloading(false);
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
                refreshData();
                SetIsloading(false);
            }
        }
        setInputStatus(false);
    };

    const LinkCopy = (linkToCopy) => {
        const textarea = document.createElement('textarea');
        textarea.value = linkToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        // Optionally, provide some visual feedback to the user
        toast.success('Link Copied!', {
            position: 'bottom-right',
            autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
        });
    };
    const date = new Date(elem.createdDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    return (
        <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card elevation={3} className="h-full flex flex-col">
                {
                    isLoading ? <>
                        <CircularProgress style={{margin: "auto"}} />
                    </> : <>
                        <Link to={`/course/${elem.name}`}>
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
                                    title === 'course' ? (<>
                                        <Link to={`/course/${elem.name}`} className="hover:text-indigo-500 active:text-indigo-600">
                                            {elem.name}
                                        </Link>
                                        <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${elem.name}`)}>
                                            <Share />
                                        </IconButton>
                                    </>
                                    ) : title === 'section' ? (<>
                                        <Link to={`/course/${courseName}/${elem._id}/`} className="hover:text-indigo-500 active:text-indigo-600">
                                            {elem.name}
                                        </Link>
                                        <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${courseName}/${elem._id}/`)}>
                                            <Share />
                                        </IconButton>

                                    </>
                                    ) : (
                                        <>
                                            <Link to={`/course/${courseName}/${sectionId}/${elem._id}`} className="hover:text-indigo-500 active:text-indigo-600">
                                                {elem.name}
                                            </Link>
                                            <IconButton color="error" onClick={() => LinkCopy(`http://localhost:3000/course/${courseName}/${sectionId}/${elem._id}`)}>
                                                <Share />
                                            </IconButton>
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
                    </>
                }
            </Card>
            <ToastContainer />
        </Grid>

    );
};

export default Box;