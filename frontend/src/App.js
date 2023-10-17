import './App.css';
import { HashRouter as Router, Routes , Route } from 'react-router-dom';
import SignIn from './compnents/SignIn/SignIn'
import Register from './compnents/Register/Register';
import MainLecturer from './compnents/MainLecturer/MainLecturer'
import Exams from './compnents/Exams/Exams';
import Grading from './compnents/Grading/Grading';
import Statistics from './compnents/Statistics/Statistics';
import CreateExam from './compnents/CreateExam/CreateExam';
import OpenQuestion from './compnents/OpenQuestion/OpenQuestion';
import MultipleQ from './compnents/MultipleQ/MultipleQ';
import MainStudent from './compnents/MainStudent/MainStudent';
function App() {
  return (
    <div id='App'>
        <Router>
            <Routes>
              <Route  path="/" element={<SignIn/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/MainLecturer" element={<MainLecturer/>} />
              <Route path="/Exams" element={<Exams/>} />
              <Route path="/Grading" element={<Grading/>} />
              <Route path="/Statistics" element={<Statistics/>} />
              <Route path="/CreateExam" element={<CreateExam/>} />
              <Route path="/OpenQuestion" element={<OpenQuestion/>} />
              <Route path="/MultipleQ" element={<MultipleQ/>} />
              <Route path="/MainStudent" element={<MainStudent/>} />



            </Routes> 
        </Router>  
        
    </div>
  );
};

export default App;
