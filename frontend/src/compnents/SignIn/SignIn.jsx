import React, { useEffect, useState , useRef} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Modal, Button } from "react-bootstrap";



const SignIn=()=> {

    const navigate = useNavigate(); /* define hook to navigate to other pages */
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
    const handleClickSignUp = () => {
        navigate('/Register');
    };
    /* define useForm for the logIn form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        //resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });
    const signInFormRef = useRef(null);
    const submitForm = async ( e) => {
    const id = signInFormRef.current.querySelector('#id').value;
    const password = signInFormRef.current.querySelector('#password').value;
    console.log(signInFormRef.current.querySelector('#id').value,signInFormRef.current.querySelector('#password').value)
    try{
        const res=await axios.post("http://localhost:8000/SignIn",{
            id,
            password
    })
    console.log("after request (success) ");
    console.log(res?.data)
    if(res?.data?.success===true){
        if(res?.data?.info?.status==="Lecturer"){
            localStorage.setItem('idL',JSON.stringify(res?.data?.info?.idL))
            navigate('/MainLecturer');
        }if(res?.data?.info?.status==="Student"){
            localStorage.setItem('idS',JSON.stringify(res?.data?.info?.idS))
            navigate('/MainStudent');
        }
        else{
            setMsgModal("You need to create an account!")
            handleShow();
        }
    }
    if(res?.data?.success===false){
        if(res?.data?.error===null){
            setMsgModal("You need to create an account! or check your id number")
            handleShow();
        }
        if(res?.data?.error!==null){
            setMsgModal(res?.data?.error)
            handleShow();
        }
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
                                                    <h1 className='questionMark'>Please enter your ID and password</h1>
                                                </center>
                                            </div>
                                        </center>
                                        <br/>
                                    </div>
                                        <div className="row" id='form-con'>
                                        <form action="POST" id='sign-in-form' ref={signInFormRef} onSubmit={handleSubmit(submitForm)}>
                                            <div className="text-con">
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;" id="id" type="text" className="form-control form-control-user"
                                                    name="iduser"
                                                    placeholder="Enter ID..."{...register('id')}/>**</center>
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;"  id="password" type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>**</center>
                                                
                                            </div>
                                            <div className="submit-btn">
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;" type="submit"  className='doneBtn' value='Done'/> </center>
                                            </div>
                                            </form>
                                            <center>
                                            <div className="row" id='new-account'>
                                            <b> <span>Don't Have An Account?</span><br/><a className="small cursor-pointer" onClick={handleClickSignUp}>Click me!</a></b>
                                            </div>
                                            </center>
                                        </div>
                                     
                            </div>
                            </center><div><Modal show={showModal} onHide={handleClose}>
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
                        
                    
                    <div className="row" >
                    
                    <center>
                            <div className="down-buttons">
                                <hr/>
                                <button className='about-us' /*onClick={() => navigate('/about')}*/>About Us</button>
                            </div>
                        </center>
                    </div>

                </div></div> 
        </div>
        </footer>
  )
}
export default SignIn;