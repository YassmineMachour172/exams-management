import React, {  useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

 const Exams=() =>{
    const navigate=useNavigate();
    const [dataa,setData]=useState({
        name:  "yassmine",
        id:"123",
        examDate:"12/05/2023",
        startH:"12:00",
        totalTime: "123",
        randomQ: "yes",
        randomA:"yes"
    })
    const handleClickCreateExam = () => {
       /* console.log('Edit button clicked for car with treatment number: ', row.original.treatmentNumber);
        localStorage.setItem('carService', JSON.stringify(row.original)); /* save the car service data that choose to edit in local storage */
        navigate('/CreateExam'); /* navigate to the editCarService page */
    }
    const handleClickSearch = () => {
        //console.log('Delete button clicked for car with treatment number: ', row.original.treatmentNumber);
        
        /* send request to the server to delete the specific car service */
       /* await fetch('/deleteCar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                treatmentNumber:   row.original.treatmentNumber,
            })
        })
       window.location.reload(false) /* reload the page after delete car service*/
    }

    const data = [
        {
            name:  "yassmine",
            id:"123",
            examDate:"12/05/2023",
            startH:"12:00",
            totalTime: "123",
            randomQ: "yes",
            randomA:"yes"
        },
        {
            name:  "yassmine",
            id:"123",
            examDate:"12/05/2023",
            startH:"12:00",
            totalTime: "123",
            randomQ: "yes",
            randomA:"yes"
        },
        {
            name:  "yassmine",
            id:"123",
            examDate:"12/05/2023",
            startH:"12:00",
            totalTime: "123",
            randomQ: "yes",
            randomA:"yes"
        },
        {
            name:  "yassmine",
            id:"123",
            examDate:"12/05/2023",
            startH:"12:00",
            totalTime: "123",
            randomQ: "yes",
            randomA:"yes"
        }
    ]
  return (
    <div  className="container-fluid">
        <h1>Exams</h1>
     <br/>
     <br/>
    <button onClick={handleClickCreateExam}>create exam</button><br/>
     <input type='text' placeholder='exam name...'/><button onClick={handleClickSearch}>Search</button>
      <center> <table className='table4' Style="color:Black;text-align: center;">
                <tr Style="color: #D66850;">
               
                    
                    
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.id}</td>
                            <td>{val.examDate}</td>
                            <td>{val.startH}</td>
                            <td>{val.totalTime}</td>
                            <td>{val.randomQ}</td>
                            <td>{val.randomA}</td>
                                                 
                        </tr>
                    )
                })}
            </table></center> 
    </div>
  )
}
export default Exams;