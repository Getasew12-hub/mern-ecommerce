import { create } from "zustand";
import axios from "../middleware/axios"
import toast from "react-hot-toast";
import userStore from "./userStore";
const cartStore=create((set,get)=>({

    lodding:false,
    smallLoad:null,
   carts:[],
   cartLength:0,
   total:0,
   Length:0,
   payment:false,
   original:0,
  getCart:async () => {
    
      set({lodding:true,first:false})
      
    
    try {
        const res=await axios.get("/cart");
       
         let carts=res.data;
         const cartItem=await axios.get("/cuppone");
         if(cartItem.data.message===true){
            carts=carts.map((val)=> {
                return{
                    ...val,
                    original:val.price,
                    price:(val.price-(val.price*(val.discount/100))).toFixed(0)
                }
            })
         }
        set({carts,cartLength:res.data.length,lodding:false})

        get().getCalculated()
    } catch (error) {
        set({lodding:false})
       
    }
  },
    AddToCart:async (id,price) => {
         set({smallLoad:id})
   if(!userStore.getState().user)  return toast.error('Please first login or signup')
    try {
        
        const res=await axios.post('/cart',{id,price})
          set({smallLoad:null})
         set({cartLength:res.data})
         toast.success("Succesfully add")
         
          get().getCalculated()
    } catch (error) {
       set({smallLoad:null})
         toast.error("Faild to add to cart")
    }
   
},
deleteCart:async (id) => {
    set({smallLoad:id})
    try {
       
        const res=await axios.delete(`/cart/${id}`)
        const carts=get().carts;
        set((pre)=>({
            carts:pre.carts.filter((val)=> val.product!==id ),
            cartLength:pre.cartLength-1
        }))
         set({smallLoad:null})
           get().getCalculated()
    } catch (error) {
         set({smallLoad:null})
        toast.error("Faild to delete cart")
    }
},

updateQuantity:async (quantity,id) => {
   
    try {

         set((pre)=>({
            carts:pre.carts.map((val)=> val.product==id ? {...val,quantity:quantity}:val)
        }))
        const res=await axios.patch("/cart",{quantity,id})
       
      
         get().getCalculated()
    } catch (error) {
       
        toast.error("Faild to update quantity")
    }
},
getCalculated:async () => {
  const carts=get().carts;
  let total=0;
  let original=0;
  carts.map((val)=>{
    if(val.original){
        original+=(val.original*val.quantity)
    }else{
         original+=(val.price*val.quantity)
    }

        total+=(val.price*val.quantity)
  })
 set({total,original})
},

deleteAllCart:async () => {
    try {
       
        set({carts:[],cartLength:0,payment:true});
        const res=await axios.post("/cart/allcart");
        get().getNumberNoti()
          return res.data;
    } catch (error) {
      
    }
},
  getNumberNoti:async () => {
        try {
            const res=await axios.get('/payment/numberNoti');
            set({Length:res.data})
        } catch (error) {
          
        }
    },

    UpdateNotiRead:async () => {
    try {
        set({Length:0})
        await axios.patch('/payment/updateNoti');
    } catch (error) {
      
    }
}
}))

export default cartStore;