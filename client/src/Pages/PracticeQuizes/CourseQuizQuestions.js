// CourseQuizQuestions.js
import React from 'react';
import QuizQuestions from './QuizQuestions';
import { getCourseSingleQuiz } from '../../Component/ApiFunctions/getQuizData';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
const CourseQuizQuestions = () => {
  const { name, QuizId } = useParams();

  return (
    <>
    <QuizQuestions
      getQuizDataFunction={getCourseSingleQuiz}
      params={[name, QuizId]}
      pageName="CourseQuizQuestions"
    />
    <Link component="button" variant="body2" to={`/course/${name}/quizes`}>
            <Button variant="contained" color="primary">
               Go to Quiz Page
            </Button>
             
            </Link>
    </>
    

  );
};

export default CourseQuizQuestions;
