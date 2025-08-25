import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Navbar from './controller/Navbar'
import {Toaster} from "react-hot-toast"

import Home from "./page/home"
import Login from "./page/login"
import Signup from "./page/signup"
import { Large } from './middleware/scrole'
import userStore from "./libe/userStore"
import { useEffect } from 'react'
import { Small } from './middleware/scrole'
import Cart from "./page/cartpage"
import Dashbord from './page/dashbordPage'
import ProductPage from "./page/productPage"
import Checkout from "./page/checkout.success"
import ChckePayment from "./page/checkPayment"
import cartStore from "./libe/cartStore"
import Notification from "./page/notificationPage"


function App() {
const {payment}=cartStore()
  const {userProfile,checkAuth,user}=userStore()
   const admin=user?.role=='admin';
   
  useEffect(()=>{
    userProfile()
    
  },[userProfile])

  if(checkAuth) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><Large/></div> 
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to={"/"}/>}/>
        <Route path='/cart' element={user ? <Cart/> : <Navigate to={"/"}/>}/>
        <Route path='/notification' element={user ? <Notification/> : <Navigate to={"/"}/>}/>
        <Route path='/dashbord' element={admin ? <Dashbord/> : <Navigate to={"/"}/>}/>
        <Route path='/product/:catagory' element={ <ProductPage/>}/>
        <Route path='/checkout/seccess' element= {<ChckePayment/>}/>
        <Route path='/success' element={payment? <Checkout/> :  <Navigate to={'/'}/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
