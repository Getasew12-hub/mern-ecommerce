import React, { useState } from 'react'
import "./notificationPage.css"
import notiStore from '../libe/notiStore'
import { useEffect } from 'react';
import { Large,Small } from '../middleware/scrole';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRef } from 'react';

function notificationPage() {
    const deleteAll=useRef()
    const [error,setError]=useState({
      id:null,
      error:""
    })
    const {Notification,getNoti,lodding,OrderAccept,smallLodding,DeleteOneNoti,DeleteAllNoti}=notiStore();
    useEffect(()=>{
        getNoti()
    },[]);

   if(lodding) return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>{<Large/>}</div>
   

    function deleteAllNoti(){
    
    deleteAll.current.classList.toggle('visibility');
    }

    function deleteOne(id,delivery){
    
    if(delivery){
     DeleteOneNoti(id)
    }else{
   setError({
    id:id,
    error:"You must accept order before delete"
   })
    }
    }
  return (
    <div className='noti-container'>
        <div className="noti-item">
            <div className="header">
                <h2>Notification</h2>
              {Notification.length>0 && <div><DeleteOutlineOutlinedIcon onClick={deleteAllNoti}/>
                <p ref={deleteAll} onClick={DeleteAllNoti}>{smallLodding ? "Loadding..." : "Delete all notification"}</p>
                </div>}
                </div>

       {Notification.length>0 && Notification.map((val,index)=>     <div className="item" key={index}>
                <div className="top">
                <div className="left">
                      
                      <p>{val.text}</p>
                    <div className="eachitem">
                      <div className="img">
                        <img src={val.img} alt="" />
                       </div>
                       <div className="content">
                        <p>{val.name}</p>
                        <div style={{display:'flex',alignItems:'center'}}>
                           <h4>Quantity: </h4>
                          {val.quantity}
                        </div>
                        <div style={{display:'flex',alignItems:'center'}}> <h4>Total amount paid: </h4> ${val.amount}</div>
                       </div>
                       </div>
                </div>
                 
                 <div className="right"  >
                    <p onClick={()=>deleteOne(val.id,val.delivery)}><DeleteOutlineOutlinedIcon color='warning' style={{cursor:'pointer'}}/></p>
                   {error.id==val.id && <p className='delete'>{error.error}</p>}
                 </div>

                 </div>
           {val.delivery==false &&<div className="bottom">
               
                <button onClick={()=>{
                  setError((pre)=> pre.id==val.id? {...pre,id:null}: pre)
                   OrderAccept(val.product)}}>{smallLodding==val.product? <Small/>: "I accept order"}</button>
            </div>}

            </div>
       ) }
      {Notification.length==0  && <div style={{textAlign:"center",marginTop:"10px"}}> <h3>You have not any notification 👻</h3></div>}
        </div>
    </div>
  )
}

export default notificationPage
