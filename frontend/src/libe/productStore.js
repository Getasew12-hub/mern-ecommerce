import { create } from "zustand";
import axios from "../middleware/axios"
import toast from "react-hot-toast";

const productStore =create((set,get)=>({
    lodding:false,
    smalLodiing:false,
    loadId:null,
    featured:null,
    error:null,
    products:[],
    AllProduct:[],
    Analitics:[],
    Featured:[],
    ProductsCrate:async (e) => {
        // set({lodding:true});
        set({error:null,smalLodiing:true})
    
        try {
            const {name,discription,price,discount,catagory,img}=e;
           
            const res=await axios.post("/product/add",{name,discription,catagory,discount,img,price})
            set({smalLodiing:false})
        } catch (error) {
            set({smalLodiing:false,error:error.response.data.error || "Faild to create Product"})
        }
    },
catagoryProd:async (catagory,user) => {
    set({lodding:true})
    try {
      
        const res=await axios.get(`/product/catagory/${catagory}`);
          let products=res.data;
       
        if(user){
               const res=await axios.get("/cuppone")
        
        if(res.data.message===true){
          
           
            products=products.map((val)=> {
               
                return {
                    ...val,
                    orginal:val.price,
                    price:val.price-(val.price*(val.discount/100))
                }
            
           })
        }

     
        }
      
        set({lodding:false,products})
    } catch (error) {
         set({lodding:false})
    }
},
recommendProduct:async () => {
     set({lodding:true});
    try {
       const res=await axios.get("/product/recommed");
         let products=res.data;
          const cartItem=await axios.get("/cuppone");
          if(cartItem.data.message===true){

            products=products.map((val)=>{
                return{
                    ...val,
                    original:val.price,
                    price:val.price-(val.price*(val.discount/100))
                }
            })
          }
        
set({lodding:false,products})
    } catch (error) {
      
        set({lodding:false})
    }
},

getAllproducts:async () => {
    set({lodding:true})
    try {
        const res=await axios.get("/product");
        set({AllProduct:res.data,lodding:false})
    } catch (error) {
        set({lodding:false})
     
    }
},
updateFeatured:async (id) => {
    set({featured:id})
    try {
        const res=await axios.post(`/product/featured/${id}`);
        set((pre)=>({
            AllProduct:pre.AllProduct.map((val)=> val.id==id? {...val,featured:res.data}: val),
            featured:null
        }))
        
    } catch (error) {
        set({featured:null})
        console.log(error)
    }
    
},

deleteProduct:async (id) => {
    set({loadId:id})
    try {
       
        const res=await axios.delete(`/product/${id}`);
            set((pre)=>({
            AllProduct:pre.AllProduct.filter((val)=> val.id!==id)
        }))
        set({loadId:null})
    } catch (error) {
        set({loadId:null})
         toast.error('It is orderd product,please first delete it on ordered')
    }
},
updateProducts:async (items,id) => {
    set({smalLodiing:true})
    try {
        let {name,price,img,discription,discount,catagory}=items;
        const res=await axios.patch(`/product/${id}`,{name,price,img,discription,discount,catagory})
        set((pre)=>({
            AllProduct:pre.AllProduct.map((val)=>
                 val.id===id? {
                    ...val,
                    name:name || val.name,
                    price:price || val.price,
                    img:res.data || val.img,
                    discription:discription || val.discription,
                    discount:discount || val.discount,
                    catagory:catagory || val.catagory,

                 }:val),
                 smalLodiing:false
        }
        
    ))
    } catch (error) {
        set({smalLodiing:false})
       

    }
}
,
getAnalitycs:async () => {
    set({lodding:true});
    try {
        const res=await axios.get("/analitycs");
       
        set({lodding:false,Analitics:res.data})
    } catch (error) {
        set({lodding:false})
    }
},

getFeatured:async (user) => {
    set({lodding:true})

    try {
        const res=await axios.get('/product/featured');
        let products=res.data;
       
              if(user){
               const res=await axios.get("/cuppone")
       
        if(res.data.message===true){
          
           
            products=products.map((val)=> {
               
                return {
                    ...val,
                    orginal:val.price,
                    price:val.price-(val.price*(val.discount/100))
                }
            
           })
        }

     
        }

        set({Featured:products,lodding:false})
    } catch (error) {
        set({lodding:false})
    }
},


}))

export default productStore;