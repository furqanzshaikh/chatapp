import React from 'react'
import {auth,provoider} from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
import '../styles/auth.css'
const cookies = new Cookies()
const Auth = (props) => {
const {SetIsAuth} = props
const signin = async() =>{
  try {
    const result = await signInWithPopup(auth,provoider)
    cookies.set('auth-token', result.user.refreshToken)
    SetIsAuth(true)
  } catch (error) {
   console.log(error) 
  }
}



  return (
    <div id='sign-in'>
      <div id='box'>
      <p>Sign in with google to continue</p>
        <button onClick={signin}>Sign in with google</button>
    
      </div>
    </div>
  )
}

export default Auth