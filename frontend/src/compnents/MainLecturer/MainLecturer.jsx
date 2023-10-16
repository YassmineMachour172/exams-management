import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate  } from 'react-router-dom';

const MainLecturer=() => {
    const navigate = useNavigate(); /* define hook to navigate to other pages */

    const handleClickLogOut = () => {
        navigate('/');
    };
    const handleClickExams = () => {
        navigate('/Exams');
    };
    const handleClickGrading = () => {
        navigate('/Grading');
    };
    const handleClickStatistics = () => {
        navigate('/Statistics');
    };
  return (
    <div className="container-fluid">
      <center>
        <div className="row">
          <h1>Hello Lecturer</h1>
        </div>
        <div className="row">
          <Button variant="primary" onClick={handleClickLogOut}>LogOut</Button>
          <Button variant="primary" onClick={handleClickExams}>Exams</Button>
        </div>
        <div className="row">
          <Button variant="primary" onClick={handleClickGrading}>Grading</Button>
          <Button variant="primary" onClick={handleClickStatistics}>Statistics</Button>
        </div>

      </center>
    </div>
  )
}
export default MainLecturer;