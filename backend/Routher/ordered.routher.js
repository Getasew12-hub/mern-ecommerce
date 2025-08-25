import express from "express";
import {getOrderProducts,getUser,updateUser,deleteOrderd,deleteDelever} from "../controller/ordered.controller.js"
import { protectetRouther,admin } from "../midleware/protected.js";
const router =express.Router();
router.get("/",protectetRouther,admin,getOrderProducts)
router.get("/user/:id",protectetRouther,admin,getUser)
router.patch("/user",protectetRouther,updateUser)
router.delete("/order/:id",protectetRouther,admin,deleteOrderd)
router.post("/delever",protectetRouther,admin,deleteDelever)

export default router;