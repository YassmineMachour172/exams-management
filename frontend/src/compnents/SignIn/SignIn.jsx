import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';



const SignIn=()=> {

    const navigate = useNavigate(); /* define hook to navigate to other pages */

    const handleClickSignUp = () => {
        navigate('/Register');
    };
    /* define useForm for the logIn form */
    const { register, handleSubmit, formState: { errors }} = useForm({
        //resolver: yupResolver(logInSchema), /* validate the form with the schema */
        mode: "onChange" /* validate the form on change */
    });
    const signInForm = document.querySelector('#sign-in-form'); 
    const submitForm = async ( e) => {
    const iduser = signInForm.querySelector('#iduser').value;
    const password = signInForm.querySelector('#password').value;
   console.log(iduser,password)
   navigate('/mainLecturer');
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
                                        <form action="POST" id='sign-in-form' onSubmit={handleSubmit(submitForm)}>
                                            <div className="text-con">
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;" id="iduser" type="text" className="form-control form-control-user"
                                                    name="iduser"
                                                    placeholder="Enter ID..."{...register('iduser')}/>**</center>
                                                <center><input Style="color: Black;background-color: transparent;border-radius: 12px;"  id="password" type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" {...register('password')}/>**</center>
                                                
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
                                     
                            </div>
                            </center>
                        
                    
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