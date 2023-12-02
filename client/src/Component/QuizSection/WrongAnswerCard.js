import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import {Button} from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
const WrongAnswerCard = ({open, handleClose, wrongQues}) => {
    // Add logic to fetch or display wrong answers based on elemId

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <div>
                <strong style={{fontSize: '25px'}}>Wrong Questions</strong>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Q.No.</TableCell>
                            <TableCell>Question Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            wrongQues.map((elem, index) => {
                                return (
                                    <>
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{elem}</TableCell>
                                        </TableRow>
                                    </>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="secondary" style={{marginLeft: '10px'}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WrongAnswerCard;
