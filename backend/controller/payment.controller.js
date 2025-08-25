import { stripe } from "../libe/stripe.payment.js";
import db from "../libe/pgDatabase.js";
import env from "dotenv"
env.config()
export const getPayment=async (req,res) => {
    try {
      
       
      const {carts}=req.body

      const line_items=carts.map((val)=>{
        const amoute=val.quantity*val.price;
        
    return{
            price_data:{
                currency:'usd',
                product_data:{
                    name:val.name,
                    images:Array.isArray(val.img) ? val.img :[val.img] 
                },
                unit_amount:Math.round(val.price*100)
            },
            quantity:val.quantity || 1,
        }
      
      })

      

const respose=await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:line_items,
    mode:"payment",
    success_url:`${process.env.URL_STIPE}/checkout/seccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${process.env.URL_STIPE}/cart`

})

    return res.status(200).json(respose.id)  
    } catch (error) {
        console.log("error on getpaymet",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const chekPayment = async (req, res) =>{

try {
    const {sessionId,carts}=req.body;
   
    const status=await stripe.checkout.sessions.retrieve(sessionId);
    if(status.payment_status=='paid'){
       
       const text='Your seccessfull order'
        carts.forEach(async(val)=>{
            const total=val.quantity*val.price;
         await db.query('INSERT INTO orders(product,userid,quantity,totalamout,price) VALUES($1,$2,$3,$4,$5);',[val.product,req.user.id,val.quantity,total,val.price])

         await db.query('INSERT INTO notification(userid,img,name,amount,text,quantity,product) VALUES($1,$2,$3,$4,$5,$6,$7);',[req.user.id,val.img,val.name,total,text,val.quantity,val.product])
         
    }) 
     return res.status(200).json(true)
    }

    return res.status(200).json(false)
} catch (error) {
    console.log('error on chekpayment',error.message);
    return res.status(500).json({message:"Internal server error"});
}


};

export const deleteNoti=async (req,res) => {
    try {
        const {id}=req.params;
        await db.query('DELETE FROM notification WHERE userid=$1 AND id=$2',[req.user.id,id]);
        return res.status(200).json('success')
    } catch (error) {
         console.log('error on delete notification',error.message);
    return res.status(500).json({message:"Internal server error"});
    }
}

export const deleteAllNoti=async (req,res) => {
    try {
         await db.query('DELETE FROM notification WHERE userid=$1 AND delivery=true',[req.user.id]);
        return res.status(200).json("successfully")
    } catch (error) {
            console.log('error on delete all notification',error.message);
    return res.status(500).json({message:"Internal server error"});
    }
}

export const getNoti=async(req,res)=>{
try {
    const notificatin=await db.query("SELECT * FROM notification  WHERE userid=$1;",[req.user.id]);
    return res.status(200).json(notificatin.rows)
} catch (error) {
           console.log('error on get notification',error.message);
    return res.status(500).json({message:"Internal server error"});
}
}

export const acceptOrder=async (req,res) => {
    try {

    
        const {id}=req.body;
            console.log("user :",req.user.id,"   prooduct :",id)
      await db.query('UPDATE notification SET   delivery=$1 WHERE userid=$2 AND product=$3;',[true,req.user.id,id]);

      await db.query('UPDATE orders SET   deliver=true WHERE userid=$1 AND product=$2;',[req.user.id,id])

        return res.status(200).json({message:'successfully'})
        
    } catch (error) {
              console.log('error on get update notification',error.message);
    return res.status(500).json({message:"Internal server error"});
    }
}

export const numberOfNotification=async (req,res) => {
    try {
        const numbeNoti=await db.query('SELECT COUNT(*) As length FROM notification WHERE userid=$1 AND read=false;',[req.user.id])

        return res.status(200).json(numbeNoti.rows[0].length)
    } catch (error) {
          console.log('error on get number of notification',error.message);
    return res.status(500).json({message:"Internal server error"});
    }
}

export const updateRead=async (req,res) => {
    try {
        await db.query('UPDATE notification SET   read=true WHERE userid=$1;',[req.user.id])

        return res.status(200).json({message:'successfully'})
    } catch (error) {
             console.log('error on get update number of notification',error.message);
    return res.status(500).json({message:"Internal server error"});
    }
}