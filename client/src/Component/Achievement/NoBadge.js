import React, {useState} from 'react';
import {Button} from '@mui/material';
import AllBadges from './AllBadges';
const NoBadge = () => {
    const [show, setShow] = useState(false);
    const ExploreBadges = () => {
        setShow(true);
    };
    const handleCloseDialog = () => {
        setShow(false);
    };
    return (
        <div>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">You Have no any Badge</h3>
                    <Button
                        variant="contained"
                        onClick={ExploreBadges}
                        style={{display: 'block', marginLeft: '10px', alignContent: 'center'}}
                    >
                        Explore
                    </Button>
                </div>
            </div>
            <AllBadges open={show} handleClose={handleCloseDialog} />
        </div>
    );
};

export default NoBadge;