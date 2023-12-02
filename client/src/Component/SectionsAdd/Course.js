import React from 'react';
import AddCourseBtn from '../AddCourseBtn';
import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
const Course = () => {
  return (
    <>
      <div className="bg-blue-100 p-4">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Course
        </Typography>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {/* <!-- Add additional dropdowns here if needed --> */}
          <AddCourseBtn part="Course" />
        </div>
      </div>
    </>
  );
};

export default Course;
