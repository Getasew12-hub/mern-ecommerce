import db from "../libe/pgDatabase.js";

export const createAddres=async (req,res) => {
    try {
        const user=req.user.id
        const {state,region,city,postaCode,phoneNumber}=req.body;
        await db.query("INSERT INTO useraddres(userid,state,region,city,postal_code,phone_number) VALUES($1,$2,$3,$4,$5,$6);",[user,state,region,city,postaCode,phoneNumber])
         
        await db.query("UPDATE userinfo SET address=$1 WHERE id=$2;",[true,user])
        return res.status(201).json({message:"Succesfully create addres"})
    } catch (error) {
       
        return res.status(500).json({error:"Internal sever error"})
    }
}
export const getAddres=async (req,res) => {
    try {
        const addres=await db.query("SELECT * FROM useraddres WHERE userid=$1;",[req.user.id]);

        return res.status(200).json(addres.rows[0])
        
    } catch (error) {
         
        return res.status(500).json({error:"Internal sever error"})
    }
}

export const updateAddres=async (req,res) => {
    try {
        const {state,region,city,postaCode,phoneNumber}=req.body;
        const useraddres=await db.query("SELECT * FROM useraddres WHERE userid=$1;",[req.user.id]);
        const addres=useraddres.rows[0];

         const updateState=state || addres.state;
         const updateregion=region || addres.region;
         const updatecity=city || addres.city;
         const updatepostalcode=postaCode || addres.postal_code;
         const updatephone=phoneNumber || addres.phone_number;

         const update=await db.query("UPDATE useraddres SET state=$1,region=$2, city=$3 , postal_code=$4 , phone_number=$5 WHERE userid=$6 RETURNING *;",[updateState,updateregion,updatecity,updatepostalcode,updatephone,req.user.id]);

         return res.status(200).json(update.rows[0])
    } catch (error) {
        
        return res.status(500).json({error:"Internal sever error"})
    }
}