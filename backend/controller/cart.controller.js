import db from "../libe/pgDatabase.js"

export const getCart=async (req,res) => {
    try {
        const cart=await db.query('SELECT c.*,p.img,p.name,p.discount FROM cartitem c LEFT JOIN products p ON c.product=p.id WHERE userid=$1;',[req.user.id]);
        return res.status(200).json(cart.rows);
    
    } catch (error) {
        console.log("error on gercart ",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const addToCart=async (req,res) => {
    try {
        const {id,price}=req.body;
      
        const getItem=await db.query("SELECT * FROM cartitem WHERE product=$1 AND userid=$2;",[id,req.user.id]);

        if(getItem.rows.length>0){
            const update=await db.query("SELECT COUNT(*) AS totalcart FROM cartitem WHERE userid=$1;",[req.user.id]) 
            return res.status(200).json(update.rows[0].totalcart)
        }
        await db.query("INSERT INTO cartitem(product,userid,price) VALUES($1,$2,$3);",[id,req.user.id,price]);

        const update=await db.query("SELECT COUNT(*) AS totalcart FROM cartitem WHERE userid=$1;",[req.user.id]);

        return res.status(200).json(update.rows[0].totalcart)
    } catch (error) {
          console.log("error on add to cart ",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const updateQuantity=async (req,res) => {
    try {
        const {quantity,id}=req.body;
      
        await db.query("UPDATE cartitem SET quantity=$1 WHERE product=$2 AND userid=$3;",[quantity,id,req.user.id]);
        return res.status(200).json({message:"Seccefully update quantity"})
    } catch (error) {
        console.log("error on update quantity ",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const deleteCart=async (req,res) => {
    try {
        const {id}=req.params;
       
        await db.query("DELETE FROM cartitem WHERE userid=$1 AND product=$2;",[req.user.id,id]);
        return res.status(200).json({message:"Seccesfully delete cart"})
        
    } catch (error) {
        console.log("error on delete cart ",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const deleteAllcart=async (req,res) => {
    try {
        
        await db.query("DELETE FROM cartitem WHERE userid=$1;",[req.user.id]);
        return res.status(200).json({message:'successfully'})
    } catch (error) {
        console.log("error on dletel all cart",error.message)
          return res.status(500).json({error:"Internal sever error"})     
    }
}