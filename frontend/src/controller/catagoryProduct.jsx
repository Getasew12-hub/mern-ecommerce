import React from 'react'
import "./catagoryProduct.css"
import productStore from '../libe/productStore'

import { Link } from 'react-router-dom'
function catagoryProduct({catagory}) {


  return (
    <div className='catagory-container'>
       <Link to={`/product/${catagory.name}`}>  <div className="image" >
            <img src={catagory.imageUrl} alt={catagory.name} />
            <h2 className='name'>{catagory.name}</h2>
         </div></Link>

    </div>
  )
}

export default catagoryProduct
