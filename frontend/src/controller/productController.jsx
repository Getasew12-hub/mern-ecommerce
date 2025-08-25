import React from 'react'
import "./productController.css"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import cartStore from "../libe/cartStore"
import userStore from '../libe/userStore';
import toast from 'react-hot-toast';
import { Small } from '../middleware/scrole';

function productController({product}) {
const {AddToCart,smallLoad}=cartStore()
const {user} =userStore();

  return (
    <div className='item-product'>
         <div className="image">
            <img src={product.img} alt="" loading='lazzy' />
         </div>
         <div className='discription'>
         <p>{product.name}</p>

         <div className="price-containe">
         <h3 style={{color:"mediumseagreen",margin:"10px 0"}}>${product.price.toFixed(0)} </h3>
         {product.orginal && product.price.toFixed(0)<product.orginal.toFixed(0) && <p className='orginalprice'>${product.orginal.toFixed(0)} </p>}
         </div>
         <div className='addtocart' onClick={()=>{
            if(!user) return toast.error("Please first login or signup")
             AddToCart(product.id,product.price)
         }}>{smallLoad==product.id ? <Small/>  :<> <ShoppingCartOutlinedIcon/>  Add to cart</>}</div>
         </div>
    </div>
  )
}

export default productController
