import express from "express";
import { protectetRouther } from "../midleware/protected.js";
import { getCart,addToCart,updateQuantity,deleteCart ,deleteAllcart} from "../controller/cart.controller.js";
const routher =express.Router();
routher.get("/",protectetRouther,getCart)
routher.post("/",protectetRouther,addToCart)
routher.patch("/",protectetRouther,updateQuantity)
routher.delete("/:id",protectetRouther,deleteCart)
routher.post("/allcart",protectetRouther,deleteAllcart)
export default routher;