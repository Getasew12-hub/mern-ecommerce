import db from "../libe/pgDatabase.js";

export const anlitycsData=async () => {
    try {
        const totaluser= await db.query("SELECT COUNT(*) AS totaluser FROM userinfo");
        const totalproduct= await db.query("SELECT COUNT(*) AS totalporduct FROM products");
        const totalselse= await db.query("SELECT COUNT(*) AS totalsales FROM orders");
        const totalrevene= await db.query("SELECT SUM(totalamout) AS totalrevene FROM orders");
        const tuser=totaluser.rows[0].totaluser;
        const tproduct=totalproduct.rows[0].totalporduct;
        const tsalse=totalselse.rows[0].totalsales;
        const trevenue=totalrevene.rows[0].totalrevene;

        return {tuser,tproduct,tsalse,trevenue};
    } catch (error) {
      
        throw error;
    }
}

export const salesData=async (today,endday) => {
   
    try {
        
        const  Today=today.toISOString().split('T')[0];
        const Endday=endday.toISOString().split('T')[0]
     
        const selesdata=await db.query("SELECT created_at  ,SUM(quantity) AS sales,SUM(totalamout) AS revenue FROM orders WHERE created_at<=$1 AND  created_at>=$2 GROUP BY created_at;",[Today,Endday]);

        const seles=selesdata.rows;
        
        const allDay= getDays(today,endday);
      
        const allSelsData=allDay.map((val)=>{
            const item=seles.find((item)=> {
                
                if(val==item.created_at.toISOString().split('T')[0] ){
                    return item;
                }
            }
            );
          
            return {
                name:val,
                sales:item?.sales || 0,
                revenue:item?.revenue || 0,
                
            }
        })

        const data=await Promise.all(allSelsData);

        return data;
    } catch (error) {
      
        throw error;
        
    }
}


const getDays=(today,endday)=>{
    const date=[];
    
    while(today>=endday){
       date.push(endday.toISOString().split('T')[0])
       endday.setDate(endday.getDate()+1);
    }

    return date;
}