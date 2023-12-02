import React, {useEffect, useState} from 'react';
import AddSectionBtn from '../AddSectionBtn';
import {getAllCourses} from '../ApiFunctions/getAllCourses';
import Select from 'react-select';
import {IoMdRefresh} from 'react-icons/io';
import {Typography} from '@mui/material';
import AddCourseQuizBtn from '../QuizAdmin/AddCourseQuizBtn';
const Section = () => {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllCourses();
    setCourse(data);
  };

  const courseOptions = course.map((elem) => ({
    value: elem._id,
    label: elem.name,
  }));

  return (
    <>
      <div className="bg-blue-100 p-4">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Section
        </Typography>
        <div className="flex justify-around">
          <Select
            placeholder="Select a course"
            classNames='w-64'
            className="w-64" // Set a width for the dropdown
            options={courseOptions}
            value={selectedCourse}
            onChange={(option) => setSelectedCourse(option)}
            isSearchable
          />
          <button onClick={fetchData} className="p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
            <IoMdRefresh />
          </button>
          {/* <!-- Add additional dropdowns here if needed --> */}
          <AddSectionBtn part="section" course={selectedCourse} refreshData={fetchData} />
          <AddCourseQuizBtn part="Topic" course={selectedCourse} />
        </div>
      </div>
    </>
  );
};

export default Section;
