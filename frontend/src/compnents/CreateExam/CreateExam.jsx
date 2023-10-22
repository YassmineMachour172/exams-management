import React, { useEffect, useState , useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";


 const CreateExam=()=> {
    const navigate=useNavigate();
    const [randomA, setrandomA] = useState(false);
    const [randomQ, setrandomQ] = useState(false);
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */
    /* function that close the modal and reset the message modal*/
    const handleClose = () =>{
      setShow(false);
      setMsgModal('');
 }
 /* function that open the modal and displays it*/
 const handleShow = () =>{
     setShow(true);
 }
    const handlerandomQ = () => {
        setrandomQ(!randomQ);
        console.log(randomQ)
      };
      const handlerandomA = () => {
        setrandomA(!randomA );
        console.log(randomA)
      };
    const handleClickMultipule=()=>{
        navigate('/MultipleQ')
    }
    const handleClickOpenQues=()=>{
        navigate('/OpenQuestion')
    }
    const { register, handleSubmit, formState: { errors }} = useForm({
        //resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });
    const CreateExamFormRef= useRef(null);
    const submitForm = async ( e) => {
      const idL=localStorage.getItem('idL').replace(/"/g, '');
    const name = CreateExamFormRef.current.querySelector('#name').value;
    const examDate = CreateExamFormRef.current.querySelector('#examDate').value;
    const startH = CreateExamFormRef.current.querySelector('#startH').value;
    const totalTime = CreateExamFormRef.current.querySelector('#totalTime').value;
   console.log(name,examDate,startH,totalTime,randomA,randomQ)
   const res=await axios.post("http://localhost:8000/CreateExam",{
    name,
    idL,
    examDate,
    startH,
    totalTime,
    randomA,
    randomQ
  })
  console.log(res.data)
  if(res?.data?.success===true){
    localStorage.setItem("ExamData",JSON.stringify(res?.data?.info))
    const LecturerDataString = localStorage.getItem('LecturerData');
    const LecturerData = JSON.parse(LecturerDataString);
   const fName=LecturerData.firstName
   setMsgModal(`Dear ${fName} , the exam data has been saved. Please choose which kind of exam you wish to create.`);
   handleShow()
  }
}
  return (
    <div className="container-fluid">
    <center>  <h1>CreateExam</h1>
    <div>
        <form action="POST" id='exam-form' ref={CreateExamFormRef} onSubmit={handleSubmit(submitForm)}>
       <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="name" type="text" className="form-control form-control-user"
        name="name"
        placeholder="Enter Exam Name..."{...register('name')}/>

         <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="examDate" type="Date" className="form-control form-control-user"
        name="examDate"
        placeholder="Enter Date..."{...register('examDate')}/>
        <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="startH" type="Time" className="form-control form-control-user"
        name="startH"
        placeholder="Enter Start Time..."{...register('startH')}/>
        <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="totalTime" type="number" className="form-control form-control-user"
        name="totalTime"
        placeholder="Enter total Time..."{...register('totalTime')}/>
     
         <label>
        <input
          type="checkbox"
          checked={randomQ}
          onChange={handlerandomQ}
        />
        randomQ
      </label>
      <label>
        <input
          type="checkbox"
          checked={randomA}
          onChange={handlerandomA}
        />
        randomA
      </label>
      <input type='submit' className='doneBtn' value='Done'/>
        </form>
    </div>
        <p>
            To continue please choose what kind of exam you wish to create?
        </p>
        <div><Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='msg-modal-title'>ALERT!</Modal.Title>
                </Modal.Header>
                <Modal.Body><p className='msg-modal'>{msgModal}</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal></div>
        <div className="row">
            <button onClick={handleClickMultipule}>Multipule Answers</button>
            <button onClick={handleClickOpenQues}>Open Questions</button>
        </div>
    </center></div>
  )
}
export default CreateExam;