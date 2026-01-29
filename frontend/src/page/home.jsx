import React from 'react'
import "./home.css"
import CatagoryProduct from "../controller/catagoryProduct"
import userStore from '../libe/userStore';
import productStore from "../libe/productStore"
import { useEffect } from 'react';
import { Large, Small } from '../middleware/scrole';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useState } from 'react';
import { useRef } from 'react';
import cartStore from '../libe/cartStore';


const categories = [
  
	{ href: "/jeans", name:"Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name:"T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name:"Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name:"Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name:"Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name:"Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name:"Bags", imageUrl: "/bags.jpg" },
];

function home() {
const featurd_item=useRef()
  const [imagePerPage,setImage]=useState(4);
  const [trasform,settranform]=useState(0)
  const [initional,setInitional]=useState(0)
  const [size,setSize]=useState(innerWidth)
  


  const {Featured,getFeatured,lodding}=productStore()
  const {user}=userStore()
  const{AddToCart,smallLoad}=cartStore()

useEffect(()=>{
  if(Featured.length>0) return
  getFeatured(user)
},[getFeatured])


useEffect(()=>{
  
   settranform(initional*(100/imagePerPage))
  
},[initional,setInitional])


useEffect(()=>{
const handler=()=>{

 setSize(innerWidth)

if(size<=1200){
  setImage(3)
}
 
}
window.addEventListener('resize',handler)
if(size<=1200){
  setImage(3)
}


return ()=> removeEventListener('resize',handler)
},[])

 if(lodding) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>{<Large/>}</div>
 
 console.log("the featured is this",Featured)
  function  Prev() {
  if(featurd_item.current){
    console.log("the width of this",featurd_item.current.scrollLeft, ":::",featurd_item.current.offsetWidth)
 featurd_item.current.scrollBy({left:-featurd_item.current.offsetWidth,behavior:'smooth'});
  }
}
  function Next() {
  
  if(featurd_item.current){
 featurd_item.current.scrollBy({left:+featurd_item.current.offsetWidth,behavior:'smooth'});
  }

}




const freaturedItem=[...Featured]
if(size<=650){
  freaturedItem.push(...Featured)
}
  return (
    <div className='home-container'>

  

       <div className="catagory">
        <h1>Product Categories</h1>
        <div className="catagory-item">
        {categories.map((val,index)=>
             <CatagoryProduct catagory={val} key={index}/>
        )}
       </div>
       </div>

   {freaturedItem.length>0 &&  <div className="featured">
        <h1>Featured Products</h1>
           <div className="featured-scroll">
          <div className="featured-contaniner">
            <div className="featured-item" ref={featurd_item} >



       {freaturedItem.map((val,index)=>    <div className="item" key={index}>

        <div className="each_item">
                  <div className="image">
                    <img src={val.img} alt="" />
                  </div>


                  <div className="discription">
                  <p>{val.name}</p>
                  <div className="price">
                    <h3 style={{color:"mediumseagreen"}}>${val.price.toFixed(0)} </h3>

                   {val.orginal && val.orginal.toFixed(0)>val.price.toFixed(0) && <p style={{color:"gray",textDecoration:"line-through"}}>${val.orginal.toFixed(0)} </p>}
                  </div>

                  <button  onClick={()=>AddToCart(val.id,val.price)} >{smallLoad==val.id ?<Small/> :<><ShoppingCartOutlinedIcon className='shopingicon'/> Add to cart</>}</button>
                  </div></div>
                </div>)} 


                
                </div>
               <button className='left icon' onClick={Prev}  > <KeyboardArrowLeftOutlinedIcon  /></button>
              <button className='right icon'  onClick={Next} > <KeyboardArrowRightOutlinedIcon    /></button> 
               </div>
               </div>
       </div>}



    
    </div>
  )
}

export default home
