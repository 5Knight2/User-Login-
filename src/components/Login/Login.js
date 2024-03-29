import React, { useState,useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCollege, setEnteredCollege] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


//   useEffect(()=>{ 
    
// const cleanUp=setTimeout(()=>{
//   console.log('useEffect');
//   setFormIsValid(
//     enteredPassword.trim().length > 6 && enteredEmail.includes('@')&&enteredCollege.trim().length>0
//   )},1000)

//   return ()=>{clearTimeout(cleanUp)}
// },[enteredEmail,enteredPassword,collegeIsValid])


const [emailState,dispatchEmail]=useReducer((prevState,action)=>{
if(action.type==='USER_INPUT'){
  return {value:action.value,isValid:action.value.includes('@')}
}
if(action.type==='BLUR_INPUT'){
  return {value:prevState.value,isValid:prevState.value.includes('@')}
}

return {value:'',isValid:false}
},{value:'',isValid:true})



const [passwordState,dispatchPassword]=useReducer((prevState,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.value,isValid:action.value.trim().length>6}
  }
  if(action.type==='BLUR_INPUT'){
    return {value:prevState.value,isValid:prevState.value.trim().length>6}
  }
  
  return {value:'',isValid:false}
  },{value:'',isValid:true})


  const emailChangeHandler = (event) => {
    dispatchEmail({value:event.target.value,type:'USER_INPUT'});
    setFormIsValid(
          passwordState.isValid && emailState.isValid&&enteredCollege.trim().length>0
        )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({value:event.target.value,type:'USER_INPUT'});
    setFormIsValid(
      passwordState.isValid  && emailState.isValid&&enteredCollege.trim().length>0
    )
  };
  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    setFormIsValid(
      passwordState.isValid  && emailState.isValid&&enteredCollege.trim().length>0
    )
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'BLUR_INPUT'});
  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length>0);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'BLUR_INPUT'});;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
