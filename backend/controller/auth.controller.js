import bcrypt from "bcrypt";
import db from "../libe/pgDatabase.js";
import jwt from "jsonwebtoken";
import env from "dotenv"
import {redis} from "../libe/redis.js"


env.config();
const salt=10;

const genereatToken=async(user)=>{
    const accessToken= jwt.sign({id:user},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    const refreshToken= jwt.sign({id:user},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
  
    return {accessToken,refreshToken};
}

const setCookies=(res,accessToken,refreshToken)=>{
res.cookie("accessToken",accessToken,{
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:60*1000*15
});
res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:'strict',
    maxAge:15*24*60*60*1000 //15 days

});
}
export const sighup =async (req,res)=>{
  try{
   
const {name,email,password}=req.body;
if(!name || !email || !password) return res.status(404).json({error:"All input is requere,please insert all input"});
if(password.length<6) return res.status(404).json({error:"Password length must to be greater than 5"});


const response=await db.query("SELECT * FROM userinfo WHERE email=$1;",[email]);

if(response.rows.length>0)  return res.status(404).json({error:"User is already exsit,please login"});
  const bcryptResponse=await bcrypt.hash(password,salt);
  if(bcryptResponse){
    const newUser=await db.query("INSERT INTO userinfo(name,email,password) VALUES($1,$2,$3) RETURNING *;",[name,email,bcryptResponse]);
    const user=newUser.rows[0];
   
    await db.query("INSERT INTO cuppone(userid) VALUES($1);",[user.id]);
     const {accessToken,refreshToken}=await genereatToken(user.id);
    await redis.set(`refreshToken${user.id}`,refreshToken);
  
   setCookies(res,accessToken,refreshToken);
   return res.status(200).json(user)

  }else{
    return res.status(500).json({error:"Internal sever error"});
  }
  }catch(error){
console.error(error);
return res.status(500).json({error:"Internal server error"});
  }
}
export const login=async (req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password) return res.status(404).json({error:"Please insert all values"});
    const userInfo=await db.query("SELECT * FROM userinfo WHERE email=$1;",[email]);
    if(userInfo.rows.length>0){
        const user=userInfo.rows[0];
      
      const passwordAuth=await bcrypt.compare(password,user.password);
      
      if(passwordAuth){
        
        const {accessToken,refreshToken}=await genereatToken(user.id);
        
         await redis.set(`refreshToken${user.id}`,refreshToken);

         
   setCookies(res,accessToken,refreshToken);
   return res.status(200).json(user)
      }else{
        return res.status(404).json({error:'Incorrect password'});
      }
    }else{
        return res.status(404).json({error:"User is not found"})
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"Internal server error"});
  }
}

export const logout=async (req,res)=>{
try {
   
    const refreshToken=req.cookies.refreshToken;
    
    if(refreshToken) {
    const decode=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    
   await redis.del(`refreshToken${decode.id}`);
    }
   res.clearCookie("refreshToken");
   res.clearCookie("accessToken");

   return res.status(200).json({message:"Successfully logout"})
} catch (error) {
     console.error(error.message);
    return res.status(500).json({error:"Internal server error"});
}
}




export const successGoogle=async (req,res) => {
  if(req.Authenticate()){
    
  }
}
export const refressToken=async (req,res) => {
  try {
    const refreshToken=req.cookies.refreshToken;

   if(!refreshToken) return res.status(401).json()

  
     
      const decode= jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
      const redistoken=await redis.get(`refreshToken${decode.id}`);
        
      if(refreshToken!==redistoken) return res.status(401).json({error:"Invalid refrehs token"});
           
      const newAccessToken=jwt.sign({id:decode.id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
     
       res.cookie('accessToken',newAccessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
         maxAge:60*1000*15
      })
return res.status(201).json({message:"Successfully refresh token"})
    


    
  } catch (error) {
 
    return res.status(500).json({error:"Internal server error"});
  }
}







export const userProfile=async (req,res) => {
 
  try {
   
            return res.status(200).json(req.user);
  } catch (error) {
    console.log("error on user profile ",error.message);
    return res.status(500).json({error:"Internal sever error"})
  }
}



