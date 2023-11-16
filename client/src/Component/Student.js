import React, { useEffect, useState } from 'react';
import { getAllUsers } from './ApiFunctions/getAllCourses';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Loading from './Loading';
import NoDataFound from './NoDataFound';
import {Link} from 'react-router-dom';

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Users, setUsers] = useState([]);

  const NavigateUser = (id) =>{
    <Link to={`/admin/students/${id}`}></Link>
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="text-center my-4">
        <h2 className="text-2xl text-blue-600 font-semibold">Users List</h2>
      </div>
      {Users.length === 0 ? (
        <NoDataFound />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Users.map((user) => {
                const date = new Date(user.createdDate);
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                    <Link to={`/admin/students/${user._id}`}>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>NavigateUser()}
                        >
                        View
                      </Button>
                    </Link>
                      
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Student;
