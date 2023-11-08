import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LoggedInOrNot } from '../Component/LoggedInOrNot';
import { getTopicsAndSectionName } from '../Component/ApiFunctions/getAllCourses';
import { Container, Typography,Button, Card, CardContent, CardMedia, Grid, IconButton, TextField } from '@mui/material';
import {  Delete, Edit } from '@mui/icons-material';
import { FaRegCalendarAlt } from 'react-icons/fa';
import AddTopicBtn from '../Component/AddTopicBtn';
import LoadingComponent from '../Component/Loading';
import NoDataFoundComponent from '../Component/NoDataFound';


const Topic = () => {
  const { name ,sectionId} = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Topics, setTopics] = useState([]);
  const [SectionName,setSectionName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = /* Add your logic to check if the user is an admin */ true; // Change this to your admin check logic
  const navigate = useNavigate();
  const [parameter,setParameter] = useState([]);
  const getStatusOfLoggedIn = () => {
    let loggedInOrNot = LoggedInOrNot();
    if (!loggedInOrNot) {
      navigate('/signin');
    }
    setIsLoggedIn(loggedInOrNot);
  };

  const fetchData = async () => {
    const data = await getTopicsAndSectionName(name,sectionId);
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

  const handleUpdate = (sectionId) => {
    // Implement your update logic here
  };

  const handleDelete = (sectionId) => {
    // Implement your delete logic here
  };

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
        <AddTopicBtn part={"Topic"} course={parameter[0].course}  section={parameter[1].section}/><Button onClick={fetchData}>refresh</Button>
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
            const date = new Date(elem.createdDate);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;

            return (
              <Grid item key={elem._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card elevation={3} className="h-full flex flex-col">
                  <Link to={`/course/${name}/${sectionId}/${elem._id}`}>
                    <CardMedia
                      component="img"
                      style={{
                        height: '150px',
                        objectFit: 'cover',
                        maxWidth: '100%',
                        borderRadius: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                      }}
                      image={`/Image/Course/course${Math.floor(Math.random() * 3)}.jpg`}
                    />
                  </Link>
                  <CardContent className="flex-1 text-center">
                    <Typography variant="h6" component="h2" className="mb-2 text-gray-800">
                      <Link to={`/course/${name}/${sectionId}/${elem._id}`} className="hover:text-indigo-500 active:text-indigo-600">
                        {elem.name}
                      </Link>
                    </Typography>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <FaRegCalendarAlt size={20} className="text-indigo-500" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-500">Topics</span>
                        <span>{elem.Topics}</span>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="mt-3">
                        <IconButton
                          color="primary"
                          onClick={() => handleUpdate(elem._id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(elem._id)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Topic;
