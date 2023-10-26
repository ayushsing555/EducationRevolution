import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Notfound from './Pages/Not-found';
import About from './Pages/About';
import Home from './Pages/Home';
import Commingsoon from './Pages/Commingsoon';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
function App() {
  return (
      <>
        <BrowserRouter>
         <Navbar/>
         <Routes>
           <Route path='/signin' element={<Signin/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/' element={<Home/>}/>
           <Route path='/Quiz/*' element={<Commingsoon/>}/>
           <Route path='*' element={<Notfound/>}/>
         </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
