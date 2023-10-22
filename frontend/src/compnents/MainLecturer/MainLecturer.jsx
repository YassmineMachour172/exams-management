import React, { useEffect, useState , useRef} from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const MainLecturer=() => {
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    useEffect(() => {
      const idL =  localStorage.getItem('idL').replace(/"/g, '');
      console.log(idL);
      const fetchUser = async () => {
        try {
          console.log("requesting",idL);
          const response = await axios.get(`http://localhost:8000/MainLecturer?idL=${idL}`);
          console.log(response.data)
          if(response.data.success===true)
          {
            //{ success: true, error: null, info: {lecturerData} }
            localStorage.setItem('LecturerData',JSON.stringify(response.data.info.LecturerData))
            console.log(response.data.info)
            setFirstName(response.data.info.LecturerData.firstName);
            setLastName(response.data.info.LecturerData.lastName)
          }else{
            //{ success: false, error: err, info: null }
            console.log(response.data.error)
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchUser();
    }, []);
    const handleClickLogOut = () => {
      localStorage.removeItem('idL');
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
          <h1>Hello {firstName}   {lastName}</h1>
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