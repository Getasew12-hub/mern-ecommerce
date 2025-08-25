import jwt from "jsonwebtoken";
import env from "dotenv";
import db from "../libe/pgDatabase.js";
env.config()
export const protectetRouther=async (req,res,next) => {
   
    try {
        const accessToken=req.cookies.accessToken;
       if(!accessToken) {
     
            return res.status(401).json({error:"Access token is not provided"});
        }
       
           
            const decode=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
            const userinfo=await db.query("SELECT * FROM userinfo WHERE id=$1;",[decode.id]);
          
            if(userinfo.rows.length==0) return res.status(401).json({error:"Unauthoriz user"})
            const user=userinfo.rows[0];

            req.user=user;
        
        
         return  next()
       
    } catch (error) {
        console.log("error on protecte routher ",error.message);
        return res.status(500).json({error:"Internal sever error"});
    }
}

export const protectedRouther=async (req,res,next) => {
    try {
        const accesstoken =req.cookies.accessToken;
        if(!accesstoken) return res.status(401).json({error:"Unautorize, access token is not provide"});
        const decoded=jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET);
        const user=await db.query("SELECT id,name ,email,role FROM userinfo WHERE id=$1;",[decoded.id]);
        if(user.rows.length==0) return res.status(401).json({error:"User not found"});
        req.user=user.rows[0];
        next();
    } catch (error) {
        console.log("error on product routher",error.message);
        res.status(401).json({error:"Internal server error "});
    }
}



export const admin=async (req,res,next) => {
    try {
        const user=req.user.role;
        if(user!=='admin') return res.status(404).json({error:"You are not admin"})
        
        next();
    } catch (error) {
        console.log("error on admin routher ",error.message);
        return res.status(500).json({error:"Internal sever error"});
    }
}