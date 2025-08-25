import React, { useEffect, useRef, useState } from 'react'
import "./cartpage.css"
import Cart from "../controller/cartController"
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import cartStore from '../libe/cartStore';
import productStore from '../libe/productStore';
import { Large,Small } from '../middleware/scrole';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import userStore from '../libe/userStore';
import AddressForm from '../controller/addressForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from '../middleware/axios';
import {loadStripe} from "@stripe/stripe-js"


function cartpage() {
  
const stripePromise= loadStripe('pk_test_51RrzZIRF0CQPUam28s7Sppw51JLcSMaayzQp1nS4zm8kzMj6TfKc3wBN3Cg4TUpPRtdylBix0QO2UBQyZB5SnRlc00KphTEcMX')

  const addreCreate=useRef()
  const [wait,setWait]=useState(false)
  const {carts,lodding,getCart,total,original,AddToCart,cartLength,smallLoad} =cartStore()
const {recommendProduct,products,recommendLoad}=productStore()
const {user,upddateGet,Address,userAddress}=userStore()
useEffect(()=>{
  getCart()
   userAddress()
},[getCart,cartLength])
useEffect(()=>{
    recommendProduct()
},[cartLength])

useEffect(()=>{
  if(user?.address && upddateGet ){
     addreCreate.current.style.visibility='hidden'
  }
},[user])
if(lodding) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>{<Large/>}</div>

async function Paymenthadler(){
  if(user?.address){
   
  try {
  
    setWait(true)

    const stripe=await stripePromise;

    const res=await axios.post("/payment",{carts})
    await stripe.redirectToCheckout({
      sessionId:res.data,
    })
     setWait(false)

  } catch (error) {
   
    setWait(false)
  }
  }else{
   addreCreate.current.style.visibility='visible'
  }
}

function removevisibility(){
   addreCreate.current.style.visibility='hidden'
   
}


  return (
    <div className='cart-container'>
        {carts.length==0 &&

        <div className='non-cart'>
                <ShoppingCartIcon className='icon'/>
                <div>You have not any cart yer  <Link to="/"><span>shopping here  <ArrowForwardIcon/></span></Link> </div>
        </div>}
       {carts.length>0 &&  <div className="carts">
            <div className="left-cart">
               {carts?.map((val,index)=> <Cart cart={val} key={index}/>)} 
            </div>
            <div className="right-cart">
                       <h2>Order summary</h2>
                       <div className="order-price">
                        <div className="item">
                            <p>Orginal price</p>
                            <h4>${original.toFixed(0)} </h4>
                        </div>
                      {original-total>0 && <div className="item">
                           <p>Save</p>
                            <h4 style={{color:"mediumseagreen"}}>${(original-total).toFixed(0)} </h4>
                        </div>}
                       </div>

                       <div className="total">
                        <p>Total</p>
                        <h3 style={{color:"mediumseagreen"}}>${total.toFixed(0)} </h3>
                       </div>
                       <button onClick={Paymenthadler}>{wait?  <Small/>: 'Proceed to checkout'}</button>
                       <p>or <span>Continue shopping <ArrowForwardOutlinedIcon/></span></p>
            </div>
         </div>}

        { carts.length>0 && products.length>0 && <div className="recommedContainer">
          <h2>Recommend product</h2>

        {recommendLoad ? <Large/>:  <div className="products">
            <div className="product-containe">
         {products.map((val,index)=>
                <div className="item" key={index}>
                  <div className="image">
                    <img src={val.img} alt="" />
                  </div>


                  <div className="discription">
                  <p>{val.name}</p>
                  <div className="price">
                    <h3 style={{color:"mediumseagreen"}}>${val.price.toFixed(0)} </h3>
                   {val.original && val.original>val.price && <p style={{color:"gray",textDecoration:"line-through"}}>${val.original.toFixed(0)} </p>}
                  </div>

                  <button  onClick={()=>AddToCart(val.id,val.price)}> {smallLoad==val.id ?<Small/>:<>  <ShoppingCartOutlinedIcon/> Add to cart</>}</button>
                  </div>
                </div>
        )}
            </div>
          </div>}
         </div>}
         <div className="address-create" ref={addreCreate} onClick={removevisibility} >
          <div className="form-address" onClick={(e)=> e.stopPropagation()}>
            <ArrowBackIcon className='icon' onClick={removevisibility} />
          <h2  style={{marginBottom:"30px",textAlign:'center'}}>Create your address</h2>
                <AddressForm/>
                </div>
         </div>
       
    </div>
  )
}

export default cartpage
