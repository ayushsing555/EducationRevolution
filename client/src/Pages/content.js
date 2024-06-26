import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import LoadingComponent from '../Component/Loading';
import {getContent} from '../Component/ApiFunctions/getAllCourses';
import {Container, Button, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import NoDataFound from '../Component/NoDataFound';
import ContentBox from '../Component/ContentBox';
import AddContentBtn from '../Component/AddContentBtn';
import AddContentQuizBtn from '../Component/QuizAdmin/AddContentQuizBtn';
const Content = () => {
  const {name, sectionId, TopicId} = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtopic, setSubtopicName] = useState('');
  const [Parameter, AllParamter] = useState(null);
  const [searchText, setsearchText] = useState("");
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

  const filteredData = content.filter((elem) => {
    const contentName = elem.name.toLowerCase();
    const query = searchText.toLowerCase();
    return contentName.includes(query);
  });
  useEffect(() => {
    fetchData();
  }, [name, sectionId, TopicId]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Container maxWidth="xl">
      <div className="my-6 sm:my-8 lg:my-12 text-center">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant="h4" component="h2" className="mb-4 text-gray-800 lg:text-5xl">
            {subtopic}
          </Typography>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <AddContentBtn
              part="ContentPage"
              course={Parameter[0].course}
              section={Parameter[1].section}
              Topic={Parameter[2].topic}
              refreshData={fetchData}
            />
            <AddContentQuizBtn
              part="ContentPage"
              course={Parameter[0].course}
              section={Parameter[1].section}
              Topic={Parameter[2].topic}
            />
          </div>
        </div>
        <Button onClick={fetchData}>refresh</Button>
        <Link to={`/course/${name}/${sectionId}`} className="text-indigo-500 hover:underline">
          Back to topic
        </Link>
      </div>
      <TextField
        label="Search Content"
        variant="outlined"
        value={searchText}
        fullWidth
        className="mb-4"
        onChange={(e) => setsearchText(e.target.value)}
      />
      {filteredData.length === 0 ? (
        <NoDataFound />
      ) : (
        filteredData.map((elem, index) => {
          return (
            <ContentBox elem={elem} index={index} name={name} sectionId={sectionId} topicId={TopicId} RefreshData={fetchData} />
          );
        })
      )}

    </Container>
  );
};

export default Content;
