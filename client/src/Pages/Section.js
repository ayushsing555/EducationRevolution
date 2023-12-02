import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {getIndividualCourse} from '../Component/ApiFunctions/getAllCourses';
import {Container, Typography, Grid, Button, IconButton, TextField} from '@mui/material';

import Box from '../Component/Box';
import LoadingComponent from '../Component/Loading';
import NoDataFoundComponent from '../Component/NoDataFound';
import AddSectionBtn from '../Component/AddSectionBtn';
import AddCourseQuizBtn from '../Component/QuizAdmin/AddCourseQuizBtn';
import {getUserDetail} from '../Component/Functionality/GetUserDetail';

const Section = () => {
  const {name} = useParams();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const getStatusOfLoggedIn = () => {
    let loggedInOrNot = getUserDetail();
    if (loggedInOrNot == null) {
      navigate('/signin');
    }
  };

  const fetchData = async () => {
    const data = await getIndividualCourse(name);
    setSections(data.reverse());
    setLoading(false);
  };

  useEffect(() => {
    getStatusOfLoggedIn();
    fetchData(name);
  }, []);


  const filteredSections = sections.filter((section) => {
    const sectionName = section.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return sectionName.includes(query);
  });

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxWidth="xl">
      <div className="my-6 sm:my-8 lg:my-12 text-center">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
            {name}
          </Typography>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <AddSectionBtn refreshData={fetchData} part="SectionPage" course={{label: name}} />
            <AddCourseQuizBtn part="SectionPage" course={{label: name}} />
          </div>
        </div>
        <Button onClick={fetchData}>refresh</Button>
        <Typography variant="h6" component="p" className="text-gray-500 md:text-lg">
          Select Any Section
        </Typography>
        <Link to="/course" className="text-indigo-500 hover:underline">
          Back to Courses
        </Link>
      </div>
      <TextField
        label="Search Sections"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      {filteredSections.length === 0 ? (
        <NoDataFoundComponent />
      ) : (
        <Grid container spacing={4}>
          {filteredSections.map((elem) => {
            return (
              <Box
                title="section"
                elem={elem}
                refreshData={fetchData}
                courseName={name}
              />
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Section;
