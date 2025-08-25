import React, { useEffect, useRef } from 'react'
import "./AllProduct.css"
import productStore from '../libe/productStore'
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UpdatePro from "../controller/createProduct"
import { useState } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Small } from '../middleware/scrole';


function AllProduct() {
const header=useRef()
const itemScroll=useRef()

    const {AllProduct,updateFeatured,deleteProduct,loadId,featured}=productStore();
 
const [updateValue,setUpdate]=useState("")

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

const updateOnePro=(val)=>{
        setUpdate(val)
        const input=document.querySelector(".updateProduct");
        input.style.visibility="visible"
      
}
function removeVisiblity(){
     const input=document.querySelector(".updateProduct");
        input.style.visibility="hidden"
}
  return (
    <div className='allproduct-contaniner'>

    {AllProduct.length>0?  <div className="header" ref={header}>
      <div className="item">
            <p>Image</p>
            <p>Name</p>
            <p>Catagory</p>
            <p>Price</p>
            <p>Featured</p>
            <p>Discount</p>
            <p>Update</p>
            <p>Delete</p>
            
        </div> </div>:
        <div style={{textAlign:"center"}}>
          <h3>You have not any product</h3>
          </div>}
        <div className="all-item" ref={itemScroll}>
{AllProduct.map((val,index)=>
<div className='each_item' key={index}>
     <div className="img item">
        <img src={val.img} alt="" />
     </div>
     <p className='item'>{val.name}</p>
     <p className='item'>{val.catagory}</p>
     <p className='item'>{val.price}</p>
     <p className='item' style={{color:val.featured==true && "gold"}}>{featured==val.id ?<Small/>:<StarIcon style={{cursor:"pointer"}} onClick={()=>updateFeatured(val.id)}  /> }</p>
     <p className='item'>{val.discount}</p>
     <div className='item update'>
       <button onClick={()=>updateOnePro(val) }>update</button> </div>
     <div className='item'>
        <p style={{color:"darkred",cursor:"pointer",display:"inline-block"}} onClick={()=> deleteProduct(val.id)}>{loadId==val.id ?<Small/> :<DeleteOutlineOutlinedIcon/>}</p>
       </div>
</div>
)}</div>


<div className="updateProduct"  onClick={removeVisiblity} >
  <div className="updateitem">
    <ArrowBackIcon className='icon' onClick={removeVisiblity}/>
    <UpdatePro update={true} val={updateValue} onClick={(e)=> {e.stopPropagation()}} />
    </div>
</div>
    </div>
  )
}

export default AllProduct
