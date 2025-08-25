import React from 'react'
import cartStore from "../libe/cartStore"
import { useState } from 'react';
import { Large } from '../middleware/scrole';
import { useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import axios from "../middleware/axios"
import { useNavigate } from 'react-router-dom';
import notiStore from '../libe/notiStore';

function checkPayment() {
  const navigate=useNavigate()
  
      const [checkPaymet,setPaymetn]=useState(true);
  const [paymentError,setError]=useState(false)
  const [call,setCall]=useState(false);


  const {deleteAllCart,carts}=cartStore();
  const sessionId=new URLSearchParams(window.location.search).get('session_id');
   
   
  useEffect(()=>{
    if(!call && carts.length>0){
   async function chakpayment(){
     try {
      
      const res=await axios.post('/payment/checkpayment',{sessionId,carts});
      if(res.data){

      
           setPaymetn(false);
          
         
          await  deleteAllCart();
         
          navigate('/success')
     
      }else{
       setPaymetn(false);
       setError(true);
      }
     
     } catch (error) {
     
      console.log(error)
     }
    }
  
      setCall(true)
chakpayment()
}

      if(!sessionId){
           
            navigate('/')
        }
  
  },[carts])


  if(paymentError) return <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <ErrorIcon style={{color:'red',fontSize:'70px'}}/>
     <h1 style={{color:"red"}}>Error on payment method</h1> </div>


  if(checkPaymet) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><Large/></div>



}

export default checkPayment
