import express from "express";
import cookiesParse from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import env from "dotenv";
import path from "path"

import authRouther from "./Routher/auth.routher.js"
import productRouther from "./Routher/product.routher.js"
import cartRouther from "./Routher/cart.routher.js"
import addresRouther from "./Routher/addres.routher.js"
import cupponeRouther from "./Routher/cuppone.routher.js"
import analitycsRouther from "./Routher/analitycs.routher.js"
import paymetRouther from "./Routher/payment,routher.js"
import orederedRouther from "./Routher/ordered.routher.js"

env.config();

const app=express();
const port=5000;
const __dirname=path.resolve()
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));
app.use(cookiesParse());

 cloudinary.config({ 
        cloud_name: 'djcy1qwuy', 
        api_key: process.env.CLOUNDARY_APT_KEY, 
        api_secret:  process.env.CLOUDNARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });




app.use("/api/auth",authRouther)
app.use("/api/product",productRouther)
app.use("/api/cart",cartRouther)
app.use("/api/addres",addresRouther)
app.use("/api/cuppone",cupponeRouther)
app.use("/api/analitycs",analitycsRouther)
app.use("/api/payment",paymetRouther)
app.use("/api/ordered",orederedRouther)


if(process.env.NODE_ENV=='production'){

    app.use(express.static(path.join(__dirname,'frontend/dist')));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    })
}
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`)
})