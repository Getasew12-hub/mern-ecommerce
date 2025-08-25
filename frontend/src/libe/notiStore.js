import { create } from "zustand";
import axios from "../middleware/axios"

const notiStore =create((set,get)=>({
    lodding:false,
    Notification:[],
    smallLodding:null,
    

  
    getNoti:async () => {
        set({lodding:true})
        try {
          
            const res=await axios.get("/payment/notification");
           
            set({Notification:res.data,lodding:false})
        } catch (error) {
           
            set({lodding:false})
        }
    },

    OrderAccept:async (id) => {
        set({smallLodding:id});
      
        try {
            const res=await axios.patch('/payment/accpet',{id})
          set((pre)=>({
            Notification:pre.Notification.map((val)=> val.product==id? {...val,delivery:true}: val),
            smallLodding:null
          }))
        } catch (error) {
           
            set({smallLodding:null})
        }
    },

    DeleteOneNoti:async (id) => {
        set({smallLodding:true});
        try {
              set((pre)=>({
                Notification:pre.Notification.filter((val)=> val.id!==id),
               
            }))
            
            await axios.delete(`/payment/notificatin/${id}`);
            set({smallLodding:false})
        } catch (error) {
            set({smallLodding:false});
        }
    },
    DeleteAllNoti:async () => {
        set({smallLodding:true})
        try {
            
            await axios.delete('/payment/deleteAll');
            set((pre)=>({
                Notification:pre.Notification.filter((val)=>val.delivery==false),
                smallLodding:false
            }))
           
        } catch (error) {
            set({smallLodding:false})
        }
    }


}))

export default notiStore;