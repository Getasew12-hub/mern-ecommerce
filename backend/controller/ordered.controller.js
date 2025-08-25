import db from "../libe/pgDatabase.js"

export const getOrderProducts=async (req,res) => {
  
    try {

        const getordered=await db.query("SELECT  SUM(CASE WHEN o.we_delivery = FALSE THEN 1 ELSE 0 END )  AS deliver,p.img,p.name,COUNT(o.userid) AS totalorder,p.price,p.id FROM orders o LEFT JOIN products p ON p.id=o.product GROUP BY p.img,p.name,p.price,p.id");
    
        return res.status(200).json(getordered.rows)
    } catch (error) {
        console.log("error on get oreder :",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}
export const getUser=async (req,res) => {
    try {
        const {id}=req.params;
        
        const users=await db.query("SELECT o.id AS val, o.userid,o.deliver,o.we_delivery,o.quantity,o.created_at,o.totalamout, a.*, u.name,u.email FROM orders o LEFT JOIN userinfo u ON o.userid=u.id LEFT JOIN useraddres a ON a.userid=o.userid WHERE product=$1;",[id])

        return res.status(200).json(users.rows)
        
    } catch (error) {
        console.log("error on get user:",error.message);
        return res.status(500).json({error:"Internal server error"})
    }
}


export const updateUser=async (req,res) => {
    try {
        
        const {item}=req.body
        await db.query("UPDATE orders SET we_delivery=true WHERE  id=$1;",[item])
       
        return res.status(200).json('succesfully')
    } catch (error) {
        console.log("error on updateuser",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const deleteOrderd=async (req,res) => {
    try {
        const {id}=req.params;
        
        await db.query("DELETE FROM orders WHERE product=$1;",[id]);
        return res.status(200).json()
        
    } catch (error) {
          console.log("error on deleteorderd",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const deleteDelever=async (req,res) => {
   
    try {
        
        const {id}=req.body;

        await db.query("DELETE FROM orders WHERE id=$1;",[id])

        return res.status(200).json()
    } catch (error) {
          console.log("error on deletedelever",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}