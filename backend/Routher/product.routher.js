import express from "express";
import { admin, protectetRouther } from "../midleware/protected.js";
import { getAllProducts,addFeatured,addPoducts,deleteProducts,updateProducts,getFeaturedProduct,getCatagoryProduct,recommedProduct } from "../controller/product.controller.js";
const routher=express.Router();
routher.get("/",protectetRouther,admin,getAllProducts)
routher.post("/add",protectetRouther,admin,addPoducts)
routher.delete("/:id",protectetRouther,admin,deleteProducts)
routher.patch("/:id",protectetRouther,admin,updateProducts)
routher.get("/featured",getFeaturedProduct)
routher.post("/featured/:id",protectetRouther,admin,addFeatured)
routher.get("/catagory/:catagory",getCatagoryProduct)
routher.get("/recommed",protectetRouther,recommedProduct)
export default routher;