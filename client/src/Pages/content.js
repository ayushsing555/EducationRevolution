import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import LoadingComponent from '../Component/Loading';
import {getContent} from '../Component/ApiFunctions/getAllCourses';
import {Container,Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import NoDataFound from '../Component/NoDataFound';
import ContentBox from '../Component/ContentBox';
import AddContentBtn from '../Component/AddContentBtn';
const Content = () => {
  const {name, sectionId, TopicId} = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtopic, setSubtopicName] = useState('');
  const [Parameter,AllParamter] =  useState(null);
  const fetchData = async () => {
    try {
      let result = await getContent(name, sectionId, TopicId);
      result = result.result;
      AllParamter(result);
      setLoading(false);
      setContent(result[2].topic.content.reverse());
      setSubtopicName(result[2].topic.label);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, sectionId, TopicId]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxWidth="xl">
      <div className="my-6 sm:my-8 lg:my-12 text-center">
        <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
          {subtopic}
        </Typography>
        <AddContentBtn part="ContentPage" course={Parameter[0].course} section={Parameter[1].section} Topic={Parameter[2].topic} refreshData={fetchData}/><Button onClick={fetchData}>refresh</Button>
        <Link to={`/course/${name}/${sectionId}`} className="text-indigo-500 hover:underline">
          Back to topic
        </Link>
      </div>
      {content.length === 0 ? (
        <NoDataFound />
      ) : (
        content.map((elem, index) => {
          return (
            <ContentBox elem={elem} index={index} />
          );
        })
      )}
       
    </Container>
  );
};

export default Content;
