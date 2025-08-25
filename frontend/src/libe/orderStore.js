import { create } from "zustand";
import axios from "../middleware/axios.js"
const orderStore=create((set,get)=>({
    lodding:false,
    smallLodding:false,
    delLoad:null,
    click:null,
    orderPro:[],
     orderUser:[],
    getOrderdProduct:async () => {
        set({lodding:true})
        try {
            const res=await axios.get("/ordered");
            
            set({orderPro:res.data,lodding:false})
            
        } catch (error) {
           
            set({lodding:false})
        }
    },
    getUser:async (id) => {
        set({smallLodding:true,click:id})
        try {
            const res=await axios.get(`/ordered/user/${id}`);
           
            set({smallLodding:false,orderUser:res.data,})
        } catch (error) {
            set({smallLodding:false})
        }
    },
    updateAdminDelivery:async (item) => {
        set({click:item})
        try {
            const res=await axios.patch(`/ordered/user`,{item});
               set((pre)=>({
            orderUser:pre.orderUser.map((val)=> val.val==item? {...val,we_delivery:true}: val),
            click:null
          }))
        } catch (error) {
          
           set({click:null})
        }
    },

    deleteDelivery:async (id) => {
              set({delLoad:id})
        try {
            const res=await axios.post(`/ordered/delever`,{id});
               set((pre)=>({
            orderUser:pre.orderUser.filter((val)=> val.val!==id),
            delLoad:null
          }))
        } catch (error) {
         
           set({delLoad:null})
        }
    },
    deleteAllDelivery:async (id) => {
        set({delLoad:id})
        try {
            const res=await axios.delete(`/ordered/order/${id}`);
                set((pre)=>({
            orderPro:pre.orderPro.filter((val)=> val.id!==id),
            delLoad:null
          }))
        } catch (error) {
           
            set({delLoad:null})
        }
    }
}))

export default orderStore;