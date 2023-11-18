import React, { useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import { useRef } from 'react'
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'


const cookies = new Cookies();
const App = () => {

  const [isAuth,SetIsAuth] = useState(cookies.get('auth-token'))
  const [room,setRoom] = useState(null)

  const roomref= useRef(null)

  const Signuserout = async ()=> {
    await signOut(auth)
    cookies.remove('auth-token')
    SetIsAuth(false)
    setRoom(null)


  }

  if(!isAuth){
    return (
      <Auth SetIsAuth={SetIsAuth} />
    );

  }
return(
  <>
{room ? (
  <Chat cookies={cookies} signOut={signOut} SetIsAuth={SetIsAuth} setRoom={setRoom} room={room} />
  
) :(
  <div id='main-screen'>
    <label>enter room name:</label>
    <input placeholder='  Enter Room Name' ref={roomref} />
    <button onClick={()=>{
      setRoom(roomref.current.value)
    }}>enter chat</button>
    
<div className='sign-out'>
<button onClick={Signuserout}>Sign out</button>
</div>
  </div>
)
}

  </>
)

}

export default App