import express from "express";
import { getAddres,createAddres,updateAddres } from "../controller/addres.controller.js";
import { protectetRouther } from "../midleware/protected.js";
const routher=express.Router();

routher.get("/",protectetRouther,getAddres)
routher.post("/",protectetRouther,createAddres)
routher.patch("/",protectetRouther,updateAddres)
export default routher;