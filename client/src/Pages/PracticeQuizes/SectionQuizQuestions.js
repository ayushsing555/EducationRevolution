// SectionQuizQuestions.js
import React from 'react';
import QuizQuestions from './QuizQuestions';
import { getSectionSingleQuiz } from '../../Component/ApiFunctions/getQuizData';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
const SectionQuizQuestions = () => {
  const { name, sectionId, QuizId } = useParams();

  return (
    <>
<QuizQuestions
      getQuizDataFunction={getSectionSingleQuiz}
      params={[name, sectionId, QuizId]}
      pageName="SectionQuizQuestions"
    />
    <Link component="button" variant="body2" to={`/course/${name}/${sectionId}/quizes`}>
            <Button variant="contained" color="primary">
               Go to Quiz Page
            </Button>
             
            </Link>
    </>
    
  );
};

export default SectionQuizQuestions;
