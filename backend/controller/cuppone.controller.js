import db from "../libe/pgDatabase.js"

export const getCuppone=async (req,res) => {
    try {
      
        const getcuppone=await db.query("SELECT * FROM cuppone WHERE userid=$1;",[req.user.id]);
       
        if(getcuppone.rows==0) return res.status(200).json({message:false})
        const cuppone=getcuppone.rows[0].expire_date;
        const today=new Date()
        if(today>cuppone)  return res.status(200).json({message:false})

            return res.status(200).json({message:true})
    } catch (error) {
        console.log("error on get cuppone",error.message);
        return res.status(500).json({error:"Internal sever error"})
    }
}