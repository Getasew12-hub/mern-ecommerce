import express from "express";
import { protectetRouther } from "../midleware/protected.js";
import { getPayment,chekPayment ,deleteNoti,deleteAllNoti,getNoti,acceptOrder,numberOfNotification,updateRead} from "../controller/payment.controller.js";
const routher=express.Router();
routher.post("/",protectetRouther,getPayment)
routher.post("/checkpayment",protectetRouther,chekPayment);

routher.get("/notification",protectetRouther,getNoti)
routher.patch('/accpet',protectetRouther,acceptOrder)
routher.delete("/notificatin/:id",protectetRouther,deleteNoti);
routher.delete('/deleteAll',protectetRouther,deleteAllNoti);
routher.get("/numberNoti",protectetRouther,numberOfNotification)
routher.patch("/updateNoti",protectetRouther,updateRead)

export default routher;