import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {LoggedInOrNot} from '../Component/LoggedInOrNot';
import {getTopicsAndSectionName} from '../Component/ApiFunctions/getAllCourses';
import {Container, Typography, Button, Grid, TextField} from '@mui/material';

import AddTopicBtn from '../Component/AddTopicBtn';
import LoadingComponent from '../Component/Loading';
import NoDataFoundComponent from '../Component/NoDataFound';
import Box from '../Component/Box';
const Topic = () => {
  const {name, sectionId} = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Topics, setTopics] = useState([]);
  const [SectionName, setSectionName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [parameter, setParameter] = useState([]);
  const getStatusOfLoggedIn = () => {
    let loggedInOrNot = LoggedInOrNot();
    if (!loggedInOrNot) {
      navigate('/signin');
    }
    setIsLoggedIn(loggedInOrNot);
  };

  const fetchData = async () => {
    const data = await getTopicsAndSectionName(name, sectionId);
    console.log(data);
    setTopics(data[1].section.topics.reverse());
    setSectionName(data[1].section.label);
    setParameter(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    getStatusOfLoggedIn();
  }, []);

  

  const filteredTopic = Topics.filter((section) => {
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
        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
          {SectionName}
        </Typography>
        <AddTopicBtn refreshData = {fetchData} part={"Topic"} course={parameter[0].course} section={parameter[1].section} /><Button onClick={fetchData}>refresh</Button>
        <Typography variant="h6" component="p" className="text-gray-500 md:text-lg">
          Select Any Topic
        </Typography>
        <Link to={`/course/${name}`} className="text-indigo-500 hover:underline">
          Back to Section
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
      {filteredTopic.length === 0 ? (
        <NoDataFoundComponent />
      ) : (
        <Grid container spacing={4}>
          {filteredTopic.map((elem) => {
            return (
              <Box
                title="topic"
                elem={elem}
                courseName={parameter[0].course.label}
                sectionId = {parameter[1].section.value}
                refreshData = {fetchData}
              />
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Topic;
