import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Notfound from './Pages/Not-found';
import About from './Pages/About';
import Home from './Pages/Home';
import Commingsoon from './Component/Commingsoon';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Course from './Pages/Course';
import {useState} from 'react';
import Section from './Pages/Section';
import Student from './Pages/Admin/student';
import Admin from './Pages/Admin';
import Content from './Component/Content';
import Quiz from './Pages/Quiz';
import Topic from './Pages/Topic';
import ContentPage from './Pages/content';
import Footer from './Component/Footer';
import DailyQuiz from './Pages/DailyQuiz';
import SingleUserPage from './Component/SingleUserPage';
import QuizPage from './Pages/QuizPage';
import DailyQuizAnalysis from './Component/QuizSection/DailyQuizAnalysis';
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // Callback function to update the 'isLoggedIn' state
  const updateLoggedInStatus = (status) => {
    setLoggedIn(!isLoggedIn);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<Signin functionCall={updateLoggedInStatus} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home status={isLoggedIn} />} />
          <Route path='/Quiz/*' element={<Commingsoon />} />
          <Route path='*' element={<Notfound />} />
          <Route path='/course/' element={<Course />} />
          <Route path='/course/:name' element={<Section />} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/students' element={<Student/>}/>
          <Route path='/admin/content' element={<Content/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/course/:name/:sectionId' element={<Topic/>}/>
          <Route path='/course/:name/:sectionId/:TopicId' element={<ContentPage/>}/>
          <Route path='/admin/students/:id' element={<SingleUserPage/>}/>
          <Route path='/DailyQuiz' element={<DailyQuiz/>}/>
          <Route path="/dailyQuiz/:day/:month/:year" element={<QuizPage/>}/>
          <Route path="/dailyQuiz/analysis/:day/:month/:year" element={<DailyQuizAnalysis/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
