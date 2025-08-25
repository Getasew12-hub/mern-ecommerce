import React, { useEffect } from 'react'
import "./productPage.css"
import productStore from '../libe/productStore'
import { Large } from '../middleware/scrole'
import ProductController from "../controller/productController"
import { useParams } from 'react-router-dom'
import userStore from '../libe/userStore'

function productPage() {
const {products,lodding,catagoryProd}=productStore()
const {user} =userStore()
const {catagory}=useParams()
useEffect(()=>{
catagoryProd(catagory,user)

},[])
if(lodding) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><Large/></div>

  return (
    <div className='products-controller'>
      <div className="product">
        <h1>{catagory}</h1>
     <div className="item-contanine">
         { products.length>0  &&  products.map((val,index)=> 
         <ProductController product={val} key={index}/>
         )   }

         
         </div>
   {products.length==0 && <div style={{textAlign:'center',width:'100%'}}> <h3>Not have product in this catagory</h3>  </div>}
         
      </div>
    </div>
  )
}

export default productPage
