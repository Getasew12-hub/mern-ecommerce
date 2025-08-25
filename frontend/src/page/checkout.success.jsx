import React from 'react'
import "./checkout.success.css"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import Brust from "../middleware/brust"


function checkout() {


  return (
     <div className='succes-container'>
      <Brust/>
        <div className="succes">
           <TaskAltIcon style={{fontSize:"80px",color:"mediumspringgreen"}}/>
           <h2 style={{color:"mediumspringgreen",margin:"10px",marginBottom:"30px"}}>Purchase Seccessful!</h2>
           <p >Thank you for your order.we are processing it now </p>
           <p style={{color:"mediumspringgreen"}}>Check you email for order details and updates.</p>
           <div className='order-delivery'>
           <div className="order">
            <span>Order number </span>
            <span style={{color:'mediumspringgreen'}}>#1234</span>
           </div>
           <div className="order">
            <span>Estimated delivery </span>
            <span style={{color:'mediumspringgreen'}}>3-5 business days</span>
           </div>
           </div>
           <button>Thanks for trusting us!</button>
           <Link to={"/"}>Continue shoping <ArrowForwardIcon/></Link>
        </div>
    </div>
  )
}

export default checkout;
