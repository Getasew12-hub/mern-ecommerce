import React from 'react'
import "./cartController.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import cartStore from '../libe/cartStore';
import toast from 'react-hot-toast';
import { Small } from '../middleware/scrole';

function cartController({cart}) {
  const {deleteCart,updateQuantity,smallLoad}=cartStore()
      
  return (
    <div className='cart-controller'>
      <div className="left-item">
        <div className="img">
            <img src={cart.img} alt={cart.name} />
        </div>
        <div className="name-delet">
            <h3>{cart.name}</h3>
            <p style={{color:"darkred",cursor:"pointer"}} onClick={()=> deleteCart(cart.product
)}>{smallLoad==cart.product ?<Small/>:<DeleteOutlinedIcon/>}</p>
        </div>
      </div>

   <div className="right-item">
    <div className="quantity">
        <button className="decrease" onClick={()=>{
          
          if(cart.quantity>1){
            cart.quantity--;
            updateQuantity(cart.quantity,cart.product)
          }else{
            toast.error("Quantity is don't less than 1",{id:"id"})
          }
        }}><RemoveOutlinedIcon  className='icon'/></button>
        <h3>{cart.quantity}</h3>
        <button className="increase" onClick={()=>{
         
            cart.quantity++;
            updateQuantity(cart.quantity,cart.product)
        
        }}><AddOutlinedIcon className='icon'/></button>
    </div>
  <div className="price-containe">
    <h3 className="price" style={{color:"mediumseagreen"}}>${parseFloat(cart.price).toFixed(0)} </h3>
    {cart.original && cart.price<cart.original  && <p className='orginalprice'>${cart.original} </p>}
    
    </div>
   </div>

    </div>
  )
}

export default cartController
