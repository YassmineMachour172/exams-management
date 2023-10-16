import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import './Register.css';
import '../../css/sb-admin-2.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Register=()=> {
    const [Status, setStatus] = useState("");
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */
    const navigate=useNavigate();
     /* function that close the modal and reset the message modal*/
     const handleClose = () =>{
        setShow(false);
        setMsgModal('');
   }
   /* function that open the modal and displays it*/
   const handleShow = () =>{
       setShow(true);
   }
    const handleChange = (event) => {
        setStatus(event.target.value)
      }
    const { register, handleSubmit, formState: { errors }} = useForm({
        //resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });
    const signUpForm = document.querySelector('#sign-up-form'); 
    const submitForm = async ( e) => {
    const id = signUpForm.querySelector('#id').value;
    const password = signUpForm.querySelector('#password').value;
    const lastName = signUpForm.querySelector('#lastName').value;
    const firstName = signUpForm.querySelector('#firstName').value;
    console.log(id,password,firstName,lastName,Status);
    try{
        console.log("before request");
        const res=await axios.post("http://localhost:8000/Register",{
            id,
            password,
            lastName,
            firstName,
            Status
        })
        console.log("after request (success) ");
        console.log(res?.data)
        if(res?.data?.success===true){
            setTimeout(() => {
                // Show an alert or perform any other actions
                setMsgModal("Welcome dear friend")
                 handleShow()
                navigate('/');
              }, 2000); // 1000ms = 1 second
           
            

        }
        if(res?.data?.success===false){
            setMsgModal(res.data.error)
            handleShow()
        }
    }catch(e){
        console.log(e);
    }
}
return (
    <div className="container-fluid">
        <center>
    <div className="row"><h1>Sign Up</h1></div>
    <form action="POST" id='sign-up-form' onSubmit={handleSubmit(submitForm)}>
        <div className="row">
            
                <input type='text' placeholder='First Name....' id='firstName'{...register('firstName')}/>
            
                <input type='text' placeholder='Last Name....' id='lastName'{...register('lastName')}/>
            
            
               
            
        </div>
        <br></br>
        <div className="row">
            <div className="col">
            <input type='text' placeholder='ID....' id='id'{...register('id')}/>
                <input type='password' placeholder='Password....' id='password'{...register('password')}/>
            </div>
        </div><br/>
        <div className="row">
            
        <select value={Status} onChange={handleChange}>
        <option value="Student">Sudent</option>
        <option value="Lecturer">Lecturer</option>
        </select>
            
        </div>
        <div className="row"> 
            <input type='submit'  className='doneBtn' value='Done'/>
        </div>
        </form>
       
        </center> <div><Modal show={showModal} onHide={handleClose}>
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
    </div>
    )
}
export default Register;