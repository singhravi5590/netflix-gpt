import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../utils/firebase';
import Background from '../assets/Background.jpg'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  function handleButtonClick(){
    let message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return;
    
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://i.pinimg.com/736x/b5/80/a3/b580a383ce5cee47ab6156b0e84843cc.jpg"
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName,photoURL} = auth.currentUser;
            dispatch(
              addUser({
                uid : uid, 
                email : email, 
                displayName : displayName, 
                photoURL : photoURL}))
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage)
        });
    }
    else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/browse")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage)
          });
        }

  }

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm)
  }

  return (
    <>
    <Header/>
        <div className='absolute'>
            <img className='w-full' src={Background}
            alt='login-Background-image'/>
        </div> 
        <form onSubmit={(e) => e.preventDefault()} className=' w-3/12 my-36 mx-auto right-0 left-0 absolute p-12 bg-black text-white rounded-lg bg-opacity-85'>
          <h1 className='font-bold text-3xl m-1'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

          {!isSignInForm && (<input
            ref={name} 
            type='text' 
            placeholder='Full Name' 
            className='p-4 my-4 w-full bg-gray-800'
          />)}

          <input
            ref = {email} 
            type='text' 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-800'
          />

          <input 
            ref = {password}
            type='password' 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-800'
          />

          <p className='text-red-600'>{errorMessage}</p>

          <button className='p-4 my-6 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to NETFLIX Sign up now" : "Already registered Sign in now"}</p>
        </form>
    </>
  )
}

export default Login