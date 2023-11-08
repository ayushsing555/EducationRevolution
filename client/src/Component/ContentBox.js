import React, {useState} from 'react';
import {Typography, Paper} from '@mui/material';

const ContentBox = ({elem, index}) => {
    const date = new Date(elem.createdDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    const formattedTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
    const content = elem.content.replace(/\n/g, '<br>');
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
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
            <Typography variant="h6" className="text-indigo-500 mb-2">
                Created at{' '}
                <span className="text-dark">
                    {formattedDate} at {formattedTime}
                </span>
            </Typography>
            <Typography variant="h5" className="text-blue-600 mb-2">
                {index + 1}. <span className="text-red-500">{elem.name}</span>
            </Typography>
            {showFullContent ? (
                <Typography variant="body1" className="text-gray-700">
                    Detail: <div dangerouslySetInnerHTML={{__html: content}} />
                </Typography>
            ) : (
                <Typography variant="body1" className="text-gray-700">
                    Detail: {content.slice(0, 100)} {/* Show only the first 100 characters */}
                    {content.length > 100 && (
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
        </Paper>
    );
};

export default ContentBox;
