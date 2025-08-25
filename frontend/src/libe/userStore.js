import {create} from "zustand";
import axios from "../middleware/axios"
import toast from "react-hot-toast";



const userStore=create((set,get)=>({
     user:null,
    lodding:false,
    checkAuth:true,
    error:null,
    smallLodding:false,
    Address:null,
    upddateGet:false,

    Signup:async (e) => {
        set({lodding:true});
        try {
            const {password,confirmpassword,name,email}=e;
            if(password!==confirmpassword) return set({error:"Password is do not mutch",lodding:false})
           const res=await axios.post("/auth/sighup",{password,name,email})
        set({user:res.data,lodding:false});
        } catch (error) {
           
           
            set({error:error.response.data.error || "Faild to signup",lodding:false})
        }
    },

    Login:async (e) => {
        set({lodding:true})
        try {
            const {email,password}=e;
           
           const res=await axios.post("/auth/login",{email,password})
           set({user:res.data,lodding:false});
          
        } catch (error) {
            set({error:error.response.data.error || "Faild to lolign",lodding:false})
        }
    },

    userProfile:async () => {
        set({checkAuth:true})
        try {
           
            const res=await axios.get("/auth/profile");
           
            set({user:res.data,checkAuth:false})
        } catch (error) {
           
            set({checkAuth:false})
        }
    },

    logout:async () => {
        try {
            const res=await axios.post("/auth/logout");
             location.reload()
            set({user:null})
            toast.success("Succesfully logout")
        } catch (error) {
            toast.error("Faild to logout")
        }
    },
    creatAddress:async (e) => {
        set({smallLodding:true})
        
    try {
       
        const {state,region,city,postaCode,phoneNumber}=e
        const res=await axios.post('/addres',{state,region,city,postaCode,phoneNumber})
         
        set((pre)=>({
            user:{...pre.user, address:true},
                 Address:{
                
                     state:state,
                    region:region,
                    city:city,
                    postal_code:postaCode,
                    phone_number:phoneNumber
                
               },
            smallLodding:false,
            upddateGet:true
        }))
    } catch (error) {
       
        set({smallLodding:false})
    }
    },

    userAddress:async () => {
        set({smallLodding:true})
        try {
            const res=await axios.get("/addres");
           
            set({Address:res.data,smallLodding:false})
        } catch (error) {
          
            set({smallLodding:false})
        }
    },
    udateAddress:async (e) => {
        set({smallLodding:true})
        try {
          
            const {state,region,city,postaCode,phoneNumber}=e
            const res=await axios.patch("/addres",{state,region,city,postaCode,phoneNumber})
            set((pre)=>({
               Address:{
                   ...pre.Address,
                     state:state || val.state,
                    region:region || val.region,
                    city:city || val.city,
                    postal_code:postaCode || val.postaCode,
                    phone_number:phoneNumber || val.phoneNumber
                
               }
               ,
               smallLodding:false,
               upddateGet:true
            }))
        } catch (error) {
            set({smallLodding:false})
        }
    },
    refreshToken:async () => {
         if(get().checkAuth) return 
        try {
          set({checkAuth:true});
            const res=await axios.post('/auth/refresh')
            set({checkAuth:false})
        
            
           return res.data
        } catch (error) {
         
            set({user:null,checkAuth:false})
            throw error
        }
    }

}))


export default userStore;


let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
      
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
          
			try {
              
				if (refreshPromise) {
        
					await refreshPromise;
					return axios(originalRequest);
				}
            
			
				refreshPromise = userStore.getState().refreshToken();
				await refreshPromise;
               
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				
                refreshPromise = null;
				userStore.getState().logout();
     
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);


