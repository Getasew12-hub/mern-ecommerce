import React, { useEffect, useState } from 'react'
import "./addressForm.css"
import userStore from "../libe/userStore"
import { Small } from '../middleware/scrole'

function addressForm({pro}) {

 
    const {smallLodding,creatAddress,udateAddress}=userStore()
    const [address,setAddress]=useState({
        state:"Ethiopia",
        region:"",
        city:"",
        phoneNumber:"",
        postaCode:"",
        
    })
useEffect(()=>{
    if(pro){
        setAddress({
           state:"Ethiopia",
        region:pro.region,
        city:pro.city,
        phoneNumber:pro.phone_number,
        postaCode:pro.postal_code, 
        })
    }

},[pro])

function formValue(e){
    const {name,value}=e.target;
       setAddress((pre)=>{
        return{
            ...pre,
            [name]:value.trimStart().charAt(0).toUpperCase()+value.slice(1),
        }
       })
}
    function formSubmit(e){
       e.preventDefault();
       if(pro){
       
       udateAddress(address)
       }else{
         creatAddress(address)}
    }
  return (
    <div className='address-container'>
      <form  onSubmit={formSubmit}>
         <label htmlFor="state">State</label>
        <select name="state"  onChange={formValue}>
            <option value="Ethiopia" >
             Ethiopia
            </option>
        </select>
        <label htmlFor="region">Region</label>
        <input type="text" name="region" required placeholder='Amhara' value={address.region} onChange={formValue} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" required placeholder='Bahirdar' value={address.city} onChange={formValue} />
        <label htmlFor="phoneNumber">Phone number</label>
        <input type='text' name="phoneNumber"  inputMode='numeric' pattern='[0-9]*' required placeholder='09101112.... ' value={address.phoneNumber} onChange={formValue} />
        <label htmlFor="postaCode">Postal code</label>
        <input type='text' name='postaCode' inputMode='numeric' pattern='[0-9]*'  placeholder='6000' value={address.postaCode} onChange={formValue} />
        <button >{smallLodding? <Small/> :pro ? "Update Address" : "Create Address"}</button>
      </form>
    </div>
  )
}

export default addressForm
