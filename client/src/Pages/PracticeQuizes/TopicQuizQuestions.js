// TopicQuizQuestions.js
import React from 'react';
import QuizQuestions from './QuizQuestions';
import {getTopicSingleQuiz} from '../../Component/ApiFunctions/getQuizData';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
const TopicQuizQuestions = () => {
  const {name, sectionId, topicId, QuizId} = useParams();

  return (
    <>
      <QuizQuestions
        getQuizDataFunction={getTopicSingleQuiz}
        params={[name, sectionId, topicId, QuizId]}
        pageName="TopicQuizQuestions"
      />

      <Link component="button" variant="body2" to={`/course/${name}/${sectionId}/${topicId}/quizes`}>
        <Button variant="contained" color="primary">
          Go to Quiz Page
        </Button>
      </Link>
    </>

  );
};

export default TopicQuizQuestions;
