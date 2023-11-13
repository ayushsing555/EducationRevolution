import React, {useState} from 'react';
import {Typography, Paper, Button, IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import {Edit, Delete} from '@mui/icons-material';
import {TextField} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import downloadImage from '../Component/Functionality/downloadFiles/downloadImage';
import downloadTextWithStyle from '../Component/Functionality/downloadFiles/downloadFile';
const ContentBox = ({elem, index, name, sectionId, topicId, RefreshData}) => {
    const date = new Date(elem.createdDate);
    const [isAdmin, SetIsAdmin] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [contentName, setContentName] = useState("");
    const [contentDetail, setContentDetail] = useState("");
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
    const content = elem.content.replace(/\n/g, '<br>');
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const handleUpdate = async () => {

        setIsEditing(true);
    };
    const handleDelete = async () => {

    };
    const handleDone = async (contentId) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify({
            name: name,
            sectionId: sectionId,
            topicId: topicId,
            contentId: contentId,
            contentName: contentName,
            content: contentDetail
        });
        let response = await fetch("http://localhost:8000/content/update", {
            method: 'put',
            body: bodyContent,
            headers: headersList
        });
        const data = await response.json();
        if (data.success) {
            alert("successfully updated");
            setIsEditing(false);
            RefreshData();
        }
        else {
            alert(data.error);
        }
    };


    return (
        <Paper
            key={index}
            elevation={3}
            className="p-4 mb-4 rounded-lg shadow-lg transform transition"
            style={{
                background: '#f9f9f9', // Change the background color
                border: '2px double #e0e0e0', // Add a border
                textAlign: 'left', // Align text to the left
            }}
        >
            {
                !isEditing ? <>
                    <Typography variant="h6" className="text-indigo-500 mb-2">
                        Created at{' '}
                        <span className="text-dark">
                            {formattedDate} at {formattedTime}
                        </span>
                    </Typography>
                    <Typography variant="h5" className="text-blue-600 mb-2">
                        {index + 1}. <span className="text-red-500">{elem.name}</span>
                        <IconButton color="primary" onClick={() => downloadTextWithStyle(elem.name,elem.content,elem.url)}>
                            <CloudDownloadIcon />
                        </IconButton>
                    </Typography>
                    {showFullContent ? (
                        <Typography variant="body1" className="text-gray-700">
                            Detail: <div dangerouslySetInnerHTML={{__html: content}} />
                        </Typography>
                    ) : (
                        <Typography variant="body1" className="text-gray-700">
                            Detail: {content.slice(0, 50)} {/* Show only the first 100 characters */}
                            {content.length > 50 && (
                                <button onClick={toggleContent} className="text-indigo-500 hover:underline">
                                    ...Read more
                                </button>
                            )}
                        </Typography>
                    )}
                    {showFullContent && (
                        <button onClick={toggleContent} className="text-indigo-500 hover:underline">
                            ...Read less
                        </button>
                    )}
                    {
                        elem.url ? <>
                            <div style={{position: 'relative'}}>
                                <img
                                    src={elem.url}
                                    alt={elem.name}
                                    style={{maxWidth: '100%', maxHeight: '200px', marginTop: '10px'}}
                                />

                                <IconButton
                                    onClick={() => downloadImage(elem.url, elem.name)}
                                    style={{
                                        position: 'absolute',
                                        bottom: 2,
                                        left: '10%',
                                        transform: 'translateX(-50%)',
                                        color: 'red',
                                    }}
                                >
                                    <CloudDownloadIcon />
                                </IconButton>

                            </div>
                        </>
                            : <>

                            </>
                    }
                </> : <>
                    <TextField
                        variant="outlined"
                        fullWidth
                        defaultValue={elem.name}
                        onChange={(e) => setContentName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        defaultValue={content}
                        onChange={(e) => setContentDetail(e.target.value)}
                    />
                </>
            }

            {isAdmin && (
                <div className="mt-3">
                    <>
                        { /* If editing is not in progress, show the Edit button */}
                        {!isEditing && (
                            <>
                                <IconButton color="primary" onClick={() => handleUpdate(elem._id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(elem._id)}>
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                        { /* If editing is in progress, show the Done button */}
                        {isEditing && (
                            <>
                                <IconButton color="success" onClick={() => handleDone(elem._id)}>
                                    <DoneIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                </div>
            )}
        </Paper>
    );
};

export default ContentBox;
