import React, { use, useEffect, useRef, useState } from 'react'
import "./Navbar.css"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom"
import userStore from "../libe/userStore"
import cartStore from '../libe/cartStore';
import AddressForm from "./addressForm"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import notiStore from '../libe/notiStore';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Navbar() {
  const userVisible=useRef()
  const menushow=useRef()
  const menuitem=useRef()
  const [size,setSize]=useState(innerWidth)
  const {user,logout,userAddress,Address,upddateGet}=userStore();
 const {Notification}=notiStore()


const [isaddress,setState]=useState(user?.address)
  const {getCart,cartLength,Length,getNumberNoti,UpdateNotiRead}=cartStore()
   useEffect(()=>{
    if(user){
      setState(user.address)
    getCart()
  getNumberNoti()}
   },[getCart,user])

   useEffect(()=>{
  
if(upddateGet){
  setState(true)

}
   },[upddateGet,Address])

useEffect(()=>{
const handler=()=>{
  
setSize(innerWidth)
}
window.addEventListener('resize',handler)



return ()=> removeEventListener('resize',handler)
},[])


    const admin=user?.role=='admin';

  async  function showForm(){
    
   
      if(user.address==false){
      userVisible.current.style.visibility='visible'
      }else{
        await userAddress();
        userVisible.current.style.visibility='visible'
       
      }
    }
 function removeVisbility(e){
  e.stopPropagation()
  userVisible.current.style.visibility='hidden'
 }

 function UpdateLocation(){
  setState(false)
 
 }

 function menu(){
 menushow.current.classList.add('active');
 menuitem.current.classList.add('active');

 }
function clearMenu(e){
  e.stopPropagation()
  menushow.current.classList.remove('active');
  menuitem.current.classList.remove('active');

}
function removeMenu(){
     menushow.current.classList.remove('active');
  menuitem.current.classList.remove('active');
}


  return (
    <div className='navbar-container'>

              {user && size<=900 && <Link to={'/cart'}><p className='cartcontaine'><ShoppingCartOutlinedIcon style={{fontSize:'25px'}}/>
          {cartLength>0 &&  <span className='cart'>{cartLength}</span>}
           </p></Link>  }

          {size<=500 &&  <Link to={"/"}>  <p className='home'><HomeOutlinedIcon style={{fontSize:'25px'}}/></p></Link>}

            {user && size<=900 && size>500 && <Link to={'/notification'}> 
            
            <p className='notification' onClick={UpdateNotiRead}> 
              {Length>0 && <span>{Length}</span>}
            <NotificationsNoneOutlinedIcon style={{fontSize:'25px'}}/> </p></Link> } 

            {user && size<=500 && <Link to={'/notification'}> <p className='notification' onClick={UpdateNotiRead}> {Length>0 && <span>{Length}</span>}
            <NotificationsIcon style={{fontSize:'25px'}}/> </p></Link> }  

        <button className='menuicon' onClick={menu}><MenuIcon/></button>
       {size >500 &&  <div className="right-bar"  >
          <Link to={'/'}> <h2>E-Commerce</h2></Link>
          </div>}

          <div className="left-bar"  ref={menushow} onClick={removeMenu} >
            <div className="let-item" ref={menuitem} >


            <ClearIcon className='clearicon' onClick={clearMenu}/>

           <Link to={"/"}>  <p className='home'>Home</p></Link>

          
           {user && size>900 &&  <Link to={'/notification'}> <p className='notification' onClick={UpdateNotiRead}> {Length>0 && <span>{Length}</span>}
            <NotificationsNoneOutlinedIcon/> Notification</p></Link> }


           {user && size>900 && <Link to={'/cart'}><p><ShoppingCartOutlinedIcon/> Cart
          {cartLength>0 &&  <span className='cart'>{cartLength}</span>}
           </p></Link>  }
           {admin && <Link to={"/dashbord"}><p className='dashbord'>Dashbord</p></Link>}  
            {!user &&<Link to={"/signup"}> <p className='sighup'  ><PersonOutlinedIcon/> Sign up</p></Link>}
            {!user && <Link to={"/login"}> <p className='login'><LoginOutlinedIcon/> Login</p></Link>}
            {user &&  <p className='logout' onClick={()=> logout()} style={{cursor:"pointer"}}><LogoutOutlinedIcon/> Log out</p>}

             {user &&<p className='user' onClick={showForm}><PersonOutlinedIcon/> {user.name}</p>}

             </div>
          </div>

          <div className="user" ref={userVisible} onClick={removeVisbility}>
               
         {isaddress==false &&   <div className="form" onClick={(e)=> e.stopPropagation()}>
              <ArrowBackOutlinedIcon className='icon' onClick={removeVisbility}/>

              <h2 style={{textAlign:'center'}}>{Address ? "Update your Address" : "Create your address"}</h2>
               <AddressForm  pro={Address}/>
            </div>}

         {isaddress==true && Address &&   <div className="useraddress" onClick={(e)=> e.stopPropagation()}>
          <ArrowBackOutlinedIcon className='icon' onClick={removeVisbility}/>

          <div className='iconcontaine'><FmdGoodOutlinedIcon className='icon'/></div>

                  <h2 style={{margin:"10px 0"}}>Your address</h2>
                  <h3>{user?.name}</h3>
                  <div className='Uaddress'>
                    <h4>{Address.city},</h4>
                    <h4>{Address.region},</h4>
                    <h4>{Address.state},</h4>
                    <h4>{Address.postal_code}</h4>
                  </div>
                  <h3>{Address.phone_number}</h3>
                  <p className='update' onClick={UpdateLocation}> Update address <ArrowForwardOutlinedIcon/></p>
            </div>}
          </div>
    </div>
  )
}

export default Navbar
