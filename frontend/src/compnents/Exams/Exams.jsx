import React, {  useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import ReactTable from '../ReactTable/ReactTable';
import axios from 'axios';

 const Exams=() =>{
    const navigate=useNavigate();
    const [TableData, setTableData] = useState([]);
 
    useEffect(() => {
        const idL = localStorage.getItem('idL').replace(/"/g, '');
        const fetchData = async () => {
          console.log("before");
          try {
            const response = await axios.get(`http://localhost:8000/Exams?idL=${idL}`);
            console.log("after", response.data.info);
            if (response.data.success === true) {
              setTableData(response.data.info); // Wrap examsData in an array to match your component's expected data format
            } else {
              console.log(response.data.error);
            }
          } catch (error) {
            console.error("catch ", error);
          }
        };
    
        fetchData();
      }, []);
      const [searchInput, setSearchInput] = useState("");
    const tableColumns = React.useMemo(
        () => [
          {
            Header: 'name',
            accessor: 'name',
          },
          {
            Header: 'examId',
            accessor: 'examId',
          },
          {
            Header: 'examDate',
            accessor: 'examDate',
          },
          {
            Header: 'startH',
            accessor: 'startH',
          },
          {
            Header: 'totalTime',
            accessor: 'totalTime',
          },
          {
            Header: 'randomQ',
            accessor: 'randomQ',
          },
          {
            Header: 'randomA',
            accessor: 'randomA',
          }
        ],
        []
      );
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


  return (
    <div  className="container-fluid">
        <h1>Exams</h1>
   

      <div>
        <center> 
          <h1>table </h1>   <br/>
      <br/>
      <button onClick={handleClickCreateExam}>create exam</button>
      <br/>
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <ReactTable columns={tableColumns} data={TableData} />
            </table>
          </div>
        </center>
      </div>
    </div>
  )
}
export default Exams;