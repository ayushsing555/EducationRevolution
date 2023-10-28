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
import { useNavigate } from 'react-router-dom';
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
          <Route path='/course/:id' element={<Section/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
