import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

import {getUserDetail} from '../Functionality/GetUserDetail';
import {getQuizForDate} from '../ApiFunctions/getQuizData';
import LoadingComponent from '../Loading';
import NoDataFound from '../NoDataFound';
import WrongAnswerCard from './WrongAnswerCard';

const DailyQuizAnalysis = () => {
    const [userScore, setUserScore] = useState([]);
    const [loading, setLoading] = useState(true);
    const {day, month, year} = useParams();
    const formattedDate = new Date(`${month}/${day}/${year}`);
    const [dialogue, setDialogue] = useState(false);
    const [wrongQues, setWrongQues] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const Detail = getUserDetail();
            const data = await getQuizForDate(formattedDate);
            const users = data[0].users;
            const user = users.map((elem) => {
                if (elem.email === Detail.email) {
                    return elem.attempts;
                }
            });
               console.log(user);
                setUserScore(user[0]);
            setLoading(false);
        };
        fetchData();
    }, [1]);

    if (loading) {
        return <LoadingComponent />;
    }
    if (userScore=== undefined) {
        return <NoDataFound />;
    }

    const handleClose = () => {
        setDialogue(false);
    };

    const handleClick = (id) => {
        setDialogue(true);
        setWrongQues(id);
    };

    return (
        <div style={{textAlign: 'center'}}>
            <div style={{marginBottom: '20px'}}>
                <strong style={{fontSize: '24px', fontWeight: 'bold'}}>Total Attempts:</strong>{' '}
                <strong style={{fontSize: '20px', color: "blue"}}>{userScore.length}</strong>
            </div>
            <div style={{marginBottom: '20px'}}>
                <strong style={{fontSize: '24px', fontWeight: 'bold'}}>Quiz Date:</strong>{' '}
                <strong style={{color: 'blue'}}>{formattedDate.getDate()}/{formattedDate.getMonth()}/{formattedDate.getFullYear()}</strong>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Wrong Questions</TableCell>
                            <TableCell>Analysis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userScore.map((elem) => {
                            let date = new Date(elem.date);
                            date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                            return (
                                <TableRow key={elem._id}>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{elem.score}</TableCell>
                                    <TableCell>{elem.wrongAnswers.length}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleClick(elem.wrongAnswers)}>
                                            Analysis
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <WrongAnswerCard open={dialogue} handleClose={handleClose} wrongQues={wrongQues} />
            </TableContainer>
        </div>
    );
};

export default DailyQuizAnalysis;
