import React, { useEffect, useState } from 'react';
import { logInSchema } from '../../Validations/FormsValidation';
import { useNavigate  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.css';
import { Modal, Button } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import MainTrainee from '../MainTrainee/MainTrainee';


const SignIn=()=> {
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    const [msgModal, setMsgModal] = useState('');/*define state for the message modal box */
    const [showModal, setShow] = useState(false);/*define state for the modal box */
    const [email, setMail]=useState('');
    const [saved, setSave] = useState('');/* define state for the email */
    /* function that navigates to the forgot password page */
    const handleClickForgotPassword = () => {
        navigate('/Forgot');
    };
    useEffect(()=>{
        localStorage.setItem('saved',JSON.stringify(email));
    },[]);
    /**/
    const handleClose = () =>{
        setShow(false);
        setMsgModal('');
   }

   /* function that open the modal and displays it*/
   const handleShow = () =>{
       setShow(true);
   }
    /* function that navigates to the sign up page */
    const handleClickSignUp = () => {
        navigate('/Register');
    };

    const handleClickMainTrainee = () => {
        const email=signInForm.querySelector('#emailin').value;

        console.log("calling MMain in Sign In",email);
        < MainTrainee email={email} />
        navigate(`/main-trainee/${email}`);
    };


    /* define useForm for the logIn form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });

    const signInForm = document.querySelector('#sign-in-form'); 
    const submitForm = async ( e) => {
    const email = signInForm.querySelector('#emailin').value;
    const password1 = signInForm.querySelector('#password').value;
    setMail(email);
    try{
        const res=await axios.post("http://localhost:8000/api/trainees/SignIn",{
         email,
         password1   
    })
    console.log("requesting");
    console.log(res)
    
    if(res?.data?.success===false){

        console.log(res,"Invalid email or password")
        if(res?.data?.error==="Invalid email")
            setMsgModal("Invalid email")
        if(res?.data?.error==="Invalid password")
            setMsgModal("Invalid password")
        if(res.data.error==="Already loged In")
            setMsgModal("Already loged In")
       handleShow()
    }
    if((res?.data?.success===true)){
        const save = signInForm.querySelector('#emailin').value;
        localStorage.setItem('saved', JSON.stringify(save));
        
    setMail(signInForm.querySelector('#emailin').value)
        console.log("successful")
        handleClickMainTrainee()
        
   }
    }catch(e){
        console.log(e)
    }
}

  return (
      <footer>
        <div className="container-fluid">
           
                <div className='backgroundcol'>

                    <div className="row">
                        <div className="path-con">
                            <h5 className='pa'>Sign In</h5>
                            <hr></hr>
                        </div>
                    </div>

                    
                        <div className="row-lg-7">
                            
                                <br/>
                                <br/>
                                <center>
                                <div className='border' >
                                    <div className="row">
                                        <center>
                                            <div className="circle">
                                                <center>
                                                    <h1 className='questionMark'>?</h1>
                                                </center>
                                            </div>
                                        </center>
                                        <br/>
                                    </div>
                                        <div className="row" id='form-con'>
                                        <form Style="color: Black;background-color: transparent;border-radius: 12px;" action="POST" id='sign-in-form' onSubmit={handleSubmit(submitForm)}>
                                            <div className="text-con">
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;" id="emailin" /*onChange={(e) => setMail(e.target.value)}*/  type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." {...register('email')}/>**</center>
                                                {errors.email ? <p className='error-msg'>{errors.email?.message}</p> : <br/>} {/* display error message if the email is not valid */}
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;"  id="password" type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>
                                                {errors.password ? <p className='error-msg'>{errors.password?.message}</p> : <br/>} {/* display error message if the password is not valid */}**</center>
                                                
                                            </div>
                                            <div className="forgot">
                                                <b><a className="small cursor-pointer" onClick={handleClickForgotPassword}>Forgot your password?</a></b>
                                            </div>
                                            <div className="submit-btn">
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;" type="submit" onClick={submitForm} className='doneBtn' value='Done'/> </center>
                                            </div>
                                            </form>
                                            <center>
                                            <div className="row" id='new-account'>
                                            <b> <span>Don't Have An Account?</span><br/><a className="small cursor-pointer" onClick={handleClickSignUp}>Click me!</a></b>
                                            </div>
                                            </center>
                                        </div>
                                        <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='msg-modal-title'>ALERT!</Modal.Title>
                </Modal.Header>
                <Modal.Body><p className='msg-modal'>{msgModal}</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>  
                            </div>
                            </center>
                        
                    
                    <div className="row" >
                    
                    <center>
                            <div className="down-buttons">
                                <hr/>
                                <button className='home2' onClick={() => navigate('/')}>Home</button>
                                <button className='sign-in2' disabled >Sign In</button>
                                <button className='about-us' onClick={() => navigate('/about')}>About Us</button>
                            </div>
                        </center>
                    </div>

                </div></div> 
        </div>
        </footer>
  )
}
export default SignIn;