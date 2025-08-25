import React from 'react'
import "./createProduct.css"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useRef } from 'react';
import { useState } from 'react';
import productStore from '../libe/productStore';
import { Small } from '../middleware/scrole';
import { useEffect } from 'react';

const catagory=['Jeans','T-shirts','Shoes','Glasses','Jackets','Suits','Bags']
function cteateProduct({update,val}) {

 
const {smalLodiing,ProductsCrate,error,updateProducts}=productStore();
const [handelErr,setError]=useState(error || "")
  const [isImageUpload,setUpload]=useState(false)

  const [pordutCreate,setProduct]=useState({
    name: "",
    discription:"",
    price:"",
    discount:"",
    catagory:"Jeans",
    img:""

  })
  useEffect(()=>{
  if(update && val){

    setProduct({
         name:val.name,
    discription:val.discription,
    price:val.price,
    discount:val.discount,
    catagory:val.catagory,
    img:""
    })
  }
  },[val])
  const image=useRef()
  const imageAccept=(e)=>{
      const file=e.target.files[0];
      if(file){
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(e)=>{
          setProduct((pre)=> {
            return{
              ...pre,
              img:e.target.result
        }})
           setError("")
           setUpload(true)
        }
      }
  }

  function productFom(e){
    const {name,value}=e.target;
    setProduct((pre)=>{
      return {
        ...pre,
         [name]:value.trimStart().charAt(0).toUpperCase()+value.slice(1),
      }
    })
  }

  const productSubmit=async(e)=>{
       
        e.preventDefault()
         if(!pordutCreate.img && !update) return setError("Please insert an image");
         if(update && val){
          
          const {id}=val;
          await updateProducts(pordutCreate,id)

          const input=document.querySelector(".updateProduct");
        input.style.visibility="hidden"
         }else{
       await  ProductsCrate(pordutCreate);
         }
       setProduct((pre)=>{
        return {
            name:"",
    discription:"",
    price:"",
    discount:"",
    catagory:pre.catagory,
    img:""
        }
       })
       setUpload(false);
    
  }
  return (
    <div className='createPro-conatainer' onClick={(e)=> e.stopPropagation()}>
        <form onSubmit={productSubmit}>
          <input type="text" name="name" placeholder='Product name' value={pordutCreate.name}  onChange={productFom} required/>


          <textarea   name="discription" placeholder='Discripition'   onChange={productFom} value={pordutCreate.discription}  required></textarea>


          <input type='number' name="price" placeholder='Price' step={0.1} min={0}  value={pordutCreate.price}  onChange={productFom} required/>

          <input type="number" name="discount" min={0}  max={100} placeholder='Discount for new customer in persont' value={pordutCreate.discount}  onChange={productFom} />
           <select name="catagory" value={val && pordutCreate.catagory}  onChange={productFom}>
            {catagory.map((item,index)=>
            <option key={index} value={item} >{item}</option>
            )}
           </select>
           <div>
         <p className='image-uploader' onClick={()=> image.current.click()} ><CloudUploadOutlinedIcon/>  Image</p> 
          {isImageUpload &&  <span style={{color:"mediumseagreen"}}>image is apploaded</span>}
           </div>
           <input type="file" name="img" accept='image/*' hidden ref={image} onChange={imageAccept} />
           {handelErr && <p style={{color:"red"}}>{handelErr}</p>}
           <button className='crateproduct' type='submit' >
            {smalLodiing ? <Small/>  :update ? "Update Product" :"Create Product"}</button>
        </form>
    </div>
  )
}

export default cteateProduct
