import React from 'react'
import "./signup.css"

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import userStore from "../libe/userStore"
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { Large ,Small} from '../middleware/scrole';
import { useRef } from 'react';
function signup() {
    const {Login,lodding,error} =userStore()
    const visible=useRef()
    const notvisible=useRef()
    const [show,setShow]=useState(false)
       const [loginInput,setLogin]=useState({
       
        email:"",
        password:"",
     
    })
const formInput=(e)=>{
const {name,value}=e.target;
setLogin((pre)=>{
    return{
        ...pre,
        [name]:value
    }
})

}

function sendForm(e){
e.preventDefault();

Login(loginInput)
}

function visibleHandler(){
visible.current.setAttribute('hidden',true);
notvisible.current.removeAttribute('hidden')
setShow(false)
}
function notvisibleHandler(){
  notvisible.current.setAttribute('hidden',true)
visible.current.removeAttribute('hidden');
setShow(true)
}
  return (
  
    <div className='signup-container'>
        <div className="signup-form">
            <h2>Login </h2>
            
            <form onSubmit={sendForm}>
           

                
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  placeholder='you@gmail.com'  required
                    onChange={formInput}/>
                   <EmailOutlinedIcon className='icon'/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type={show? 'text' :"password"} name="password"  placeholder='*******'  required
                    onChange={formInput}/>
                    <LockOutlinedIcon className='icon'/>
                   <p className='password-visiblity' hidden ref={visible} onClick={visibleHandler}> <RemoveRedEyeOutlinedIcon 
                         /></p>
                   <p className='password-visiblity' ref={notvisible} onClick={notvisibleHandler}> <VisibilityOffOutlinedIcon /></p>
                </div>

          
            {error &&  <p style={{color:"red",fontWeight:"bold"}}>{error}</p>}
             <button>
              {lodding ?    <Small/>: "Login"}
                </button>
            </form>

            <p>Don't have an accout?
                <Link to={"/signup"}><span>Sign up <ArrowForwardOutlinedIcon/></span>  </Link> </p>
        </div>
        <div className="image">
            <div>
                
                <img src={"/image.png"} alt="" />

                <h2>Shope Now</h2>
            </div>
        </div>
        
    </div>
  )
}

export default signup
