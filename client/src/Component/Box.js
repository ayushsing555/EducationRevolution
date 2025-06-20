import React, { useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    IconButton,
    Button,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { Delete, Edit, Share } from '@mui/icons-material';
import DoneIcon from '@mui/icons-material/Done';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QuizIcon from '@mui/icons-material/Quiz';
import downloadBulkDataWithStyle from './Functionality/downloadFiles/downloadBulkData';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Box = ({ title, elem, courseName, sectionId, TopicId, refreshData }) => {
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

        let url = '', bodyContent = {};
        if (title === 'course') {
            url = 'https://educationrevolution-1.onrender.com/course/delete';
            bodyContent = { name };
        } else if (title === 'section') {
            url = 'https://educationrevolution-1.onrender.com/course/section/delete';
            bodyContent = { name, sectionId };
        } else {
            url = 'https://educationrevolution-1.onrender.com/course/section/topic/delete';
            bodyContent = { name, sectionId, topicId: TopicId };
        }

        const result = await fetch(url, {
            method: 'delete',
            body: JSON.stringify(bodyContent),
            headers: headersList
        });

        const data = await result.json();
        if (data.success) {
            refreshData();
        }
        SetIsloading(false);
    };

    const handleUpdate = () => {
        setInputStatus(true);
    };

    const handleDone = async (name, sectionId, TopicId) => {
        SetIsloading(true);
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };

        let url = '', bodyContent = {};
        if (title === 'course') {
            url = 'https://educationrevolution-1.onrender.com/course/update';
            bodyContent = { updatedValue: updateVale, courseName: name };
        } else if (title === 'section') {
            url = 'https://educationrevolution-1.onrender.com/course/section/update';
            bodyContent = { updatedValue: updateVale, courseName: name, sectionId };
        } else {
            url = 'https://educationrevolution-1.onrender.com/course/section/topic/update';
            bodyContent = { updatedValue: updateVale, courseName: name, sectionId, topicId: TopicId };
        }

        const result = await fetch(url, {
            method: 'Put',
            body: JSON.stringify(bodyContent),
            headers: headersList
        });

        const data = await result.json();
        if (data.success) {
            refreshData();
        }
        setInputStatus(false);
        SetIsloading(false);
    };

    const LinkCopy = (linkToCopy) => {
        const textarea = document.createElement('textarea');
        textarea.value = linkToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        toast.success('Link Copied!', {
            position: 'bottom-right',
            autoClose: 2000,
        });
    };

    const date = new Date(elem.createdDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

    const topBorderColor = title === 'course'
        ? '#3f51b5'
        : title === 'section'
            ? '#4caf50'
            : '#f50057';

    return (
        <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
                elevation={6}
                className="h-full flex flex-col transition-transform hover:scale-[1.02] hover:shadow-xl"
                style={{
                    borderTop: `5px solid ${topBorderColor}`,
                    borderRadius: '12px',
                    backgroundColor: '#f9f9f9',
                    padding: '10px'
                }}
            >
                {isLoading ? (
                    <CircularProgress style={{ margin: "auto" }} />
                ) : (
                    <CardContent className="flex-1 text-center">
                        <Typography variant="h6" component="h2" className="mb-3 font-semibold text-indigo-800">
                            {isEditing ? (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={elem.name}
                                    size="small"
                                    sx={{ mt: 1, backgroundColor: '#fff' }}
                                    onChange={(e) => setUpdateValue(e.target.value)}
                                />
                            ) : (
                                <>
                                    <Link
                                        to={title === 'course'
                                            ? `/course/${elem.name}`
                                            : title === 'section'
                                                ? `/course/${courseName}/${elem._id}`
                                                : `/course/${courseName}/${sectionId}/${elem._id}`
                                        }
                                        className="hover:text-blue-700 font-medium"
                                    >
                                        {elem.name}
                                    </Link>

                                    <div className="mt-2 flex justify-center gap-2">
                                        <Tooltip title="Open Quiz" arrow>
                                            <IconButton sx={{ color: '#9c27b0' }}>
                                                <QuizIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Copy Link" arrow>
                                            <IconButton
                                                sx={{ color: '#ff9800' }}
                                                onClick={() => LinkCopy(
                                                    title === 'course'
                                                        ? `http://localhost:3000/course/${elem.name}`
                                                        : title === 'section'
                                                            ? `http://localhost:3000/course/${courseName}/${elem._id}`
                                                            : `http://localhost:3000/course/${courseName}/${sectionId}/${elem._id}`
                                                )}
                                            >
                                                <Share />
                                            </IconButton>
                                        </Tooltip>

                                        {title === 'topic' && (
                                            <Tooltip title="Download Files" arrow>
                                                <IconButton sx={{ color: '#00bcd4' }} onClick={() => downloadBulkDataWithStyle(elem)}>
                                                    <CloudDownloadIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </div>
                                </>
                            )}
                        </Typography>

                        <div className="mt-auto flex items-end justify-between border p-2 rounded bg-white shadow-sm">
                            <div>
                                <span className="block text-indigo-500 font-medium">Created At</span>
                                <span>{formattedDate}</span>
                            </div>
                            <div>
                                <span className="block text-indigo-500 font-medium">
                                    {title === 'course' ? 'Sections' : title === 'section' ? 'Topics' : 'Subtopics'}
                                </span>
                                <span>
                                    {title === 'course'
                                        ? elem.totalSections
                                        : title === 'section'
                                            ? elem.Topics
                                            : elem.content?.length}
                                </span>
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="mt-3 flex justify-center gap-2">
                                {!isEditing ? (
                                    <>
                                        <Tooltip title="Edit" arrow>
                                            <IconButton
                                                sx={{ color: '#2196f3' }}
                                                onClick={() =>
                                                    title === 'course'
                                                        ? handleUpdate(elem.name)
                                                        : title === 'section'
                                                            ? handleUpdate(courseName, elem._id)
                                                            : handleUpdate(courseName, sectionId, elem._id)
                                                }
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete" arrow>
                                            <IconButton
                                                sx={{ color: '#f44336' }}
                                                onClick={() =>
                                                    title === 'course'
                                                        ? handleDelete(elem.name)
                                                        : title === 'section'
                                                            ? handleDelete(courseName, elem._id)
                                                            : handleDelete(courseName, sectionId, elem._id)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Tooltip title="Done" arrow>
                                        <IconButton
                                            sx={{ color: '#4caf50' }}
                                            onClick={() =>
                                                title === 'course'
                                                    ? handleDone(elem.name)
                                                    : title === 'section'
                                                        ? handleDone(courseName, elem._id)
                                                        : handleDone(courseName, sectionId, elem._id)
                                            }
                                        >
                                            <DoneIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        )}
                    </CardContent>
                )}
            </Card>
            <ToastContainer />
        </Grid>
    );
};

export default Box;
