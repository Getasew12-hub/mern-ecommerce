import React from 'react'
import "./dashbordPage.css"
import { useState } from 'react'
import CreateProduct from "../controller/createProduct"
import AllProduct from '../controller/AllProduct'
import productStore from '../libe/productStore'
import { useEffect } from 'react'
import { Large } from '../middleware/scrole'
import AnaliticsProduct from '../controller/AnaliticsProduct'
import OrderdePeoduct from "../controller/OrderdePeoduct"
import orderStore from "../libe/orderStore"


function dashbordPage() {
    const [id,setId]=useState(1)
    const {getAllproducts,lodding,getAnalitycs}=productStore()
    const {getOrderdProduct,lodding:load}=orderStore()


    useEffect(()=>{
      getAllproducts()
      getAnalitycs()
      getOrderdProduct()
    },[])

   if(lodding || load) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>{<Large/>}</div>

  return (
    <div className='dashbord-container'>
      <div className="navigator-buttton">
        <button style={{background:id==1&& "mediumseagreen"}} onClick={()=>setId(1)}>Create Product</button>
        <button style={{background:id==2&& "mediumseagreen"}} onClick={()=>setId(2)}>All product</button>
        <button style={{background:id==3&& "mediumseagreen"}} onClick={()=>setId(3)}>Analitycs</button>
        <button style={{background:id==4&& "mediumseagreen"}} onClick={()=>setId(4)}>Ordered </button>
      </div>

      <div className="items">
        {id==1 && <CreateProduct/>}
        {id==2 && <AllProduct/>}
        {id==3 && <AnaliticsProduct/>}
        {id==4 && <OrderdePeoduct/>}
      </div>
    </div>
  )
}

export default dashbordPage
