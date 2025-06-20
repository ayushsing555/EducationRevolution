import React, { useState } from 'react';
import {
    Typography,
    Paper,
    Button,
    IconButton,
    TextField,
    CircularProgress,
    Tooltip
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Edit, Delete } from '@mui/icons-material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import downloadImage from '../Component/Functionality/downloadFiles/downloadImage';
import downloadTextWithStyle from '../Component/Functionality/downloadFiles/downloadFile';

const ContentBox = ({ elem, index, name, sectionId, topicId, RefreshData }) => {
    const date = new Date(elem.createdDate);
    const [isAdmin, SetIsAdmin] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [contentName, setContentName] = useState(elem.name || "");
    const [contentDetail, setContentDetail] = useState(elem.content || "");
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
    const formattedContent = elem.content.replace(/\n/g, '<br>');
    const [showFullContent, setShowFullContent] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleContent = () => setShowFullContent(!showFullContent);

    const handleUpdate = () => setIsEditing(true);

    const handleDelete = async (contentId) => {
        setLoading(true);
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        const bodyContent = JSON.stringify({
            name, sectionId, topicId, contentId
        });

        const response = await fetch("https://educationrevolution-1.onrender.com/content/delete", {
            method: 'delete',
            body: bodyContent,
            headers: headersList
        });

        const data = await response.json();
        if (data.success) {
            RefreshData();
        } else {
            alert(data.error);
        }
        setLoading(false);
    };

    const handleDone = async (contentId) => {
        setLoading(true);
        const headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        const bodyContent = JSON.stringify({
            name,
            sectionId,
            topicId,
            contentId,
            contentName,
            content: contentDetail
        });

        const response = await fetch("https://educationrevolution-1.onrender.com/content/update", {
            method: 'put',
            body: bodyContent,
            headers: headersList
        });

        const data = await response.json();
        if (data.success) {
            setIsEditing(false);
            RefreshData();
        } else {
            alert(data.error);
        }
        setLoading(false);
    };

    return (
        <Paper
            elevation={4}
            className="p-4 mb-6 shadow-lg transition-transform hover:scale-[1.01]"
            style={{
                background: '#ffffff',
                border: '2px solid #e3e3e3',
                borderRadius: '12px',
                textAlign: 'left',
            }}
        >
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {!isEditing ? (
                        <>
                            <Typography variant="subtitle2" className="text-gray-600 mb-1">
                                Created at <span className="text-black font-semibold">{formattedDate} at {formattedTime}</span>
                            </Typography>

                            <Typography variant="h6" className="text-blue-700 mb-2">
                                {index + 1}. <span className="text-red-500 font-semibold">{elem.name}</span>
                                <Tooltip title="Download Text File">
                                    <IconButton
                                        sx={{ color: '#1976d2', ml: 1 }}
                                        onClick={() => downloadTextWithStyle(elem.name, elem.content, elem.url)}
                                    >
                                        <CloudDownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            </Typography>

                            {showFullContent ? (
                                <Typography variant="body1" className="text-gray-800 mb-2">
                                    <strong>Detail:</strong>
                                    <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
                                    <Button size="small" onClick={toggleContent} sx={{ color: '#1976d2' }}>
                                        Read less
                                    </Button>
                                </Typography>
                            ) : (
                                <Typography variant="body2" className="text-gray-800 mb-2">
                                    <strong>Detail:</strong> {elem.content.slice(0, 100)}...
                                    {elem.content.length > 100 && (
                                        <Button size="small" onClick={toggleContent} sx={{ color: '#1976d2' }}>
                                            Read more
                                        </Button>
                                    )}
                                </Typography>
                            )}

                            {elem.url && (
                                <div className="relative mt-4">
                                    <img
                                        src={elem.url}
                                        alt={elem.name}
                                        style={{
                                            width: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Tooltip title="Download Image">
                                        <IconButton
                                            onClick={() => downloadImage(elem.url, elem.name)}
                                            sx={{
                                                position: 'absolute',
                                                bottom: 10,
                                                left: 10,
                                                backgroundColor: '#fff',
                                                boxShadow: 1,
                                                '&:hover': { backgroundColor: '#f5f5f5' }
                                            }}
                                        >
                                            <CloudDownloadIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Content Title"
                                className="mb-3"
                                value={contentName}
                                onChange={(e) => setContentName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                label="Content Detail"
                                value={contentDetail}
                                onChange={(e) => setContentDetail(e.target.value)}
                            />
                        </>
                    )}

                    {isAdmin && (
                        <div className="mt-4 flex gap-2">
                            {!isEditing ? (
                                <>
                                    <Tooltip title="Edit">
                                        <IconButton sx={{ color: '#0288d1' }} onClick={() => handleUpdate(elem._id)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDelete(elem._id)}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <Tooltip title="Save Changes">
                                    <IconButton sx={{ color: '#2e7d32' }} onClick={() => handleDone(elem._id)}>
                                        <DoneIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    )}
                </>
            )}
        </Paper>
    );
};

export default ContentBox;
