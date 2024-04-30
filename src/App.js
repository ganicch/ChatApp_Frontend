import './App.css';
import Home from './pages/Home';
import JoinScreen from './pages/JoinScreen';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className='body'>
      <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/home' element={<Home/>} />
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </Router>
      </div>
    </div>
  );
}

export default App;
