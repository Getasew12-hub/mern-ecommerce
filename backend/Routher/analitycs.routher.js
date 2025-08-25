import express from "express";
import { anlitycsData,salesData } from "../controller/analitycs.controller.js";

const routher =express.Router();
routher.get("/",async (req,res) => {
    try {
        const getAnalitycsData=await anlitycsData()

        const today=new Date();
        const beforeday=new Date();
       beforeday.setDate(today.getDate()-7);
    
     
        const sales=await salesData(today,beforeday);
          
        return res.status(200).json({getAnalitycsData,sales});
    } catch (error) {
        console.log("error on anlitycs",error.message)
        return res.status(500).json({error:"Internal server error"})
    }
})
export default routher;