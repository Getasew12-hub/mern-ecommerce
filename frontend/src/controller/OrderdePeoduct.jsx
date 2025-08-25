import React, { useRef,useEffect } from 'react'
import "./OrderdePeoduct.css"
import orderStore from "../libe/orderStore"
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {Small} from "../middleware/scrole"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import toast from "react-hot-toast"


function OrderdePeoduct() {

  const header=useRef()
  const itemScroll=useRef()
    const {orderPro,getUser,smallLodding,click,orderUser,updateAdminDelivery,deleteDelivery,delLoad,deleteAllDelivery}=orderStore()
    const visibility=useRef()

useEffect(()=>{
   const Scroll=()=>{
    if(header.current && itemScroll.current){
   
    itemScroll.current.scrollLeft=header.current.scrollLeft
   
     
   }
   }
  header.current.addEventListener('scroll',Scroll)

  return ()=>{if(header.current){
   return removeEventListener('scroll',Scroll);
  }}
},[])

useEffect(()=>{
   const Scrollitem=()=>{
    if(header.current && itemScroll.current){
      
  
    header.current.scrollLeft=itemScroll.current.scrollLeft
     
   }
   }
  itemScroll.current.addEventListener('scroll',Scrollitem)

  return ()=>{if(itemScroll.current){
   return removeEventListener('scroll',Scrollitem);
  }}
},[])



async function orderduser(id){
     await getUser(id);
     visibility.current.style.visibility='visible'
}

function removeVisiblity(e){
  e.stopPropagation()
   visibility.current.style.visibility='hidden'
}

function deleteorder(id,deliver){
if(deliver){
  deleteDelivery(id)
}else{
  toast.error('You can not delete it before deliver')
}
}
function deleteAll(id,deliver){
if(deliver==0){
  deleteAllDelivery(id)
}else{
  toast.error('You can not delete it before deliver all customer')
}
}



  return (
    <div className='order-container'>
      {orderPro.length>0?    <div className="product-item">
           <div className="header" ref={header}>
            <div className="item">
            <p>Image</p>
            <p>Name</p>
            <p>Number of user <br /> order it </p>
            <p>Price</p>
            <p>Show orderd user</p>
            <p>Deliver</p>
            <p>Delete</p>
            </div>
           </div>
        <div className="each-order" ref={itemScroll}>
          <div className="item">
            {orderPro.map((item,index)=>
           <div className="order-item" key={index}>
           
            <div className="img">
                <img src={item.img} alt="" />
            </div>
            <p className='item'>{item.name}</p>
            <p className='item'>{item.totalorder}</p>
            <p className='item'>{item.price}</p>
            <div className='item '>
             {smallLodding && click==item.id ? <Small/> : <ArrowForwardOutlinedIcon className='button' onClick={()=> orderduser(item.id)}/>}
                </div>
            <p className='item' ><CheckIcon style={{color:item.deliver==0 && 'mediumseagreen',fontSize:item.deliver==0 && '50px'}}/></p>
            <div className='item'>
             {delLoad==item.id ?<Small/>:<DeleteOutlineOutlinedIcon color='warning' onClick={()=>deleteAll(item.id,item.deliver)}/>}</div>
           </div>)}</div>
              </div>
          </div>:
          <div>
           <h3> You have not any orderd ordered </h3>
          </div>
}

           <div className="user-orders" ref={visibility} onClick={removeVisiblity}>

            <div className="teblecontaine" onClick={(e)=> e.stopPropagation()}>
              <ArrowBackIcon className='icon'  onClick={removeVisiblity}/>
              <h2 style={{textAlign:"center",marginBottom:"30px"}}>User information</h2>
            <div className="order-containe">
            {/* <ClearIcon className='icon'/> */}
            <table>
            <thead >
              <tr>
              <th>Name</th>
              <th>quantity</th>
              <th>Paid</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Postal code</th>
              <th>Order date</th>
              <th>Delivery</th>
              <th>We delivery</th>
              <th>Delete</th>
              </tr>
            </thead>
            
           <tbody>
          {orderUser.map((val,index)=>  <tr className="users" key={index}>
                <td>{val.name}</td>
                <td>{val.quantity}</td>
                <td>{val.totalamout}</td>
               
                 
                  <td>{val.phone_number}</td>
                 
                
                  <td>{val.city}:{val.region}:{val.state}</td>
              
                <td>{val.postal_code}</td>
                <td>{val.created_at.split('T')[0]} </td>
               {val.deliver==false?<td><ClearIcon/></td>:
                <td className='check'><CheckIcon  style={{color:'mediumspringgreen',fontSize:'35px'}}/></td>}
                <td><button className='deliver' style={{background:val.we_delivery && 'mediumseagreen' }} onClick={()=> updateAdminDelivery(val.val)} > {click==val.val? <Small/> :"Deliver"}</button></td>


                <td>{delLoad==val.val ?<Small/>:<DeleteOutlineOutlinedIcon color='warning' onClick={()=> deleteorder(val.val,val.we_delivery)}/>}</td>
            </tr>)}
            </tbody>
            </table>
            </div>
          </div>

           </div>
    </div>
  )
}

export default OrderdePeoduct
