import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';

 const CreateExam=()=> {
    const navigate=useNavigate();
    const [isRandomA, setRandomA] = useState(false);
    const [isRandomQ, setRandomQ] = useState(false);
    const handleRandomQ = () => {
        setRandomQ(!isRandomQ);
        console.log(isRandomQ)
      };
      const handleRandomA = () => {
        setRandomA(!isRandomA );
        console.log(isRandomA)
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

    const examForm = document.querySelector('#exam-form'); 
    const submitForm = async ( e) => {
    const name = examForm.querySelector('#name').value;
    const id = examForm.querySelector('#id').value;
    const examDate = examForm.querySelector('#examDate').value;
    const startH = examForm.querySelector('#startH').value;
    const totalTime = examForm.querySelector('#totalTime').value;
   console.log(name,id,examDate,startH,totalTime,isRandomA,isRandomQ)
}
  return (
    <div className="container-fluid">
    <center>  <h1>CreateExam</h1>
    <div>
        <form action="POST" id='exam-form' onSubmit={handleSubmit(submitForm)}>
       <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="name" type="text" className="form-control form-control-user"
        name="name"
        placeholder="Enter Exam Name..."{...register('name')}/>
         <input Style="color: Black;background-color: transparent;border-radius: 12px;" id="id" type="text" className="form-control form-control-user"
        name="id"
        placeholder="Enter ID..."{...register('id')}/>
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
          checked={isRandomQ}
          onChange={handleRandomQ}
        />
        RandomQ
      </label>
      <label>
        <input
          type="checkbox"
          checked={isRandomA}
          onChange={handleRandomA}
        />
        RandomA
      </label>
      <input type='submit' onClick={submitForm} className='doneBtn' value='Done'/>
        </form>
    </div>
        <p>
            To continue please choose what kind of exam you wish to create?
        </p>
        <div className="row">
            <button onClick={handleClickMultipule}>Multipule Answers</button>
            <button onClick={handleClickOpenQues}>Open Questions</button>
        </div>
    </center></div>
  )
}
export default CreateExam;