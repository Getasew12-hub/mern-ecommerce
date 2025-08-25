import express from "express";
import { sighup,login,logout,refressToken,userProfile,successGoogle} from "../controller/auth.controller.js";
import { protectetRouther } from "../midleware/protected.js";
import passport from "passport";
import GoogelStrategy from "passport-google-oauth20"
import env from "dotenv"
env.config()
const routher=express.Router();

routher.post("/sighup",sighup);
routher.post("/login",login);
routher.post("/logout",logout);
routher.post("/refresh",refressToken);
routher.get("/profile",protectetRouther,userProfile);





export default routher;

