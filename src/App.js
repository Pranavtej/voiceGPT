// import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Signup from './components/signup';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>

      
          <Route  path="/" element={<Login/>} />
          <Route  path="/login" element={<Login/>} />
          <Route path="/chat" element={<Main/>} />
          <Route path="/signup" element={<Signup/>} />
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;