import React from 'react'
import Netflix_Logo_PMS from '../assets/Netflix_Logo_PMS (2).png'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  

  function handleSignOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
      <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
          <img className='w-44' src={Netflix_Logo_PMS}
          alt='logo'/>
        {user && (<div className='flex p-2'>
        <img
         className='w-12 h-12'
         src={user?.phtoURL}
         alt='user-icon'
         />
         <button onClick={handleSignOut} className='font-bold text-white'>(signout)</button>
      </div>)}

    </div>
  )
}

export default Header