import React, { useEffect, useState } from 'react'
import { where,onSnapshot,addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { auth,db } from '../firebase'
import '../styles/chat.css'


const Chat = ({room,signOut,cookies,SetIsAuth,setRoom}) => {
const [newMessage,setNewMessage]=useState('')
const msgref = collection(db,"messages")
const [messages,setMessages]=useState([])
useEffect(()=>{
  const querymessages =query(msgref,where('room','==',room),orderBy('createdAt'))
  const unsuscribe = onSnapshot(querymessages,(snapshot)=>{
    let messages = []
    snapshot.forEach((doc)=>{
    messages.push({...doc.data(), id:doc.id})
  })

  setMessages(messages)
})

return () => unsuscribe();
},[])

const Signuserout = async ()=> {
  await signOut(auth)
  cookies.remove('auth-token')
  SetIsAuth(false)
  setRoom(null)


}

const handleSubmit= async (e)=>{
  e.preventDefault()
  if(newMessage==="") return;

  await addDoc(msgref,{
    text: newMessage,
    createdAt: serverTimestamp(),
    user : auth.currentUser.displayName,
    room,
  })
  setNewMessage('')

}

  return (
    <div id='bg-screen'>
      <button onClick={Signuserout}>Sign out</button>
    <div className='chat-app'>
    
      <div className='header'><h1>Welcome to: {room}</h1></div>
      <div className='messages'>
      <div>{messages.map((message)=><div className='message' key={message.id}>
        <span className='user'>{message.user} : </span>
        {message.text}
       
      </div>)}</div>
      </div>
      <form onSubmit={handleSubmit} className='new-message-form'>
    <input onChange={(e)=>{setNewMessage(e.target.value)}} placeholder='Type Your Message' value={newMessage} className='new-message-input' />
    <button  className='send-button' type='submit'>Send</button>
      </form>
    </div>
    </div>
    
  )
}

export default Chat
