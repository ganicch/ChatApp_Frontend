import './App.css';
import Home from './pages/Home';
import JoinScreen from './pages/JoinScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className='body'>
      <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<JoinScreen/>} />
              <Route path='/home' element={<Home/>} />
            </Routes>
          </Router>
      </div>
    </div>
  );
}

export default App;
