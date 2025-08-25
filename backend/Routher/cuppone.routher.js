import express from "express";
import { protectetRouther } from "../midleware/protected.js";
import { getCuppone } from "../controller/cuppone.controller.js";
const routher=express.Router();
routher.get("/",protectetRouther,getCuppone)

export default routher;