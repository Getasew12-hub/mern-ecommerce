import db from "../libe/pgDatabase.js"
import {v2 as cloudinary} from "cloudinary"
export const getAllProducts=async (req,res) => {
    try {
        const getProducts=await db.query("SELECT * FROM products ORDER BY id DESC");
        const products=getProducts.rows;
        return res.status(200).json(products);
    } catch (error) {
        console.log("error on gerAll product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const addPoducts=async (req,res) => {
    try {
        let {name,img,discription,price,catagory,discount}=req.body;
        
        if(img){
        const imageUpload=await cloudinary.uploader.upload(img,{folder:"products"});
         img=imageUpload.secure_url;
        }
  await db.query("INSERT INTO products(name,img,price,discription,discount,catagory) VALUES($1,$2,$3,$4,$5,$6);",[name,img,price,discription,discount || 0,catagory]);
  return res.status(201).json("Succesfully create product")
        
    } catch (error) {
           console.log("error on creatproduct product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}
export const deleteProducts=async (req,res) => {
    try {
        const {id}=req.params;
        const img=await db.query("SELECT * FROM products WHERE id=$1;",[id])
        const image=img.rows[0].img;
        if(image){
            try {
                
           
            cloudinary.uploader.destroy(`products${image.split('/').pop().split('.')[0]}`)
             } catch (error) {
                console.log("error on cloudinary ",error.message);
            }
        }
       await db.query('DELETE FROM cartitem WHERE product=$1;',[id])

        await db.query("DELETE FROM products WHERE id=$1",[id]);
        return res.status(200).json("Succefully deleted")
    } catch (error) {
            console.log("error on delete product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const updateProducts=async (req,res) => {
    try {
        const {id}=req.params;
        let {name,price,img,discription,discount,catagory}=req.body;
        
        const getproduct=await db.query("SELECT * FROM products WHERE id=$1;",[id]);
          const product=getproduct.rows[0]
          if(img){
            try {
        
            cloudinary.uploader.destroy(`products${product.img.split('/').pop().split('.')[0]}`)

            const newAppload=await cloudinary.uploader.upload(img,{folder:"products"});
            img=newAppload.secure_url;
                    
            } catch (error) {
                console.log("error on delete coundinary image",error.message)
            }
          }
        const productName=name || product.name;
        const productPrice=price || product.price;
        const productImage=img || product.img;
        const productCatagory=catagory || product.catagory;
        const productDiscount=discount || product.discount;
        const productDiscripiton=discription || product.discription;

        const update=await db.query("UPDATE products SET name=$1 , price=$2 , img=$3 , discription=$4,catagory=$5,discount=$6 WHERE id=$7 RETURNING img;",[productName,productPrice,productImage,productDiscripiton,productCatagory,productDiscount,id]);
        return res.status(200).json(update.rows[0].img)
    } catch (error) {
           console.log("error on update product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getFeaturedProduct=async (req,res) => {
    try {
        const featured=await db.query("SELECT * FROM products WHERE featured=$1;",[true])
        return res.status(200).json(featured.rows);
    } catch (error) {
           console.log("error on get featured product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const addFeatured=async (req,res) => {
    try {
        const {id}=req.params;
       
        const getproduct =await db.query("SELECT featured FROM products WHERE id=$1;",[id]);
        const featured=getproduct.rows[0].featured

        const update=await db.query("UPDATE products SET featured=$1 WHERE id=$2 RETURNING featured;",[!featured,id])
        

        return res.status(200).json(update.rows[0].featured);
    } catch (error) {
           console.log("error on add featured prouct",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getCatagoryProduct=async (req,res) => {
    try {
      
        const {catagory}=req.params;
      
        const getCatagory=await db.query("SELECT * FROM products WHERE catagory=$1;",[catagory]);
       
        return res.status(200).json(getCatagory.rows)
    } catch (error) {
         console.log("error on get catagory product",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const recommedProduct=async (req,res) => {
   
    try {
        const userCart=await db.query("SELECT p.catagory FROM cartitem c LEFT JOIN products p ON p.id=c.product  WHERE userid=$1",[req.user.id]);
        let countrer=0;
        let length=0
        const data=[]
        const uniqueSet= new Set()
        userCart.rows.forEach((val)=>{
               uniqueSet.add(val.catagory)
        })
        const catagory=[...uniqueSet]
        length=catagory.length
            let itemget=true;

            while(itemget){
         const recommend=await db.query("SELECT * FROM products WHERE id NOT IN (SELECT product FROM cartitem WHERE userid=$1) AND catagory=$2 ORDER BY RANDOM() LIMIT 4;",[req.user.id,catagory[countrer]])
        
          data.push(...recommend.rows);

         if(recommend.rows.length==4){
                 itemget=false;
         }
         countrer++;
         if(countrer>=length){
             itemget=false
         }
            }
    if(data.length<4){
         const recommend=await db.query("SELECT * FROM products WHERE id NOT IN (SELECT product FROM cartitem WHERE userid=$1) ORDER BY RANDOM() LIMIT 4;",[req.user.id]);
         data.push(...recommend.rows);
    }

    const uniqueValue=new Map();

    data.forEach((product)=>{
        uniqueValue.set(product.id,product);
    })

    const recommedPro=Array.from(uniqueValue.values());

const limitSize=recommedPro.slice(0,4)
   
        
        return res.status(200).json(limitSize)
        
    } catch (error) {
        console.log("error on recommended product",error.message)
        return res.status(500).json({error:"Internal server error"})
    }
}