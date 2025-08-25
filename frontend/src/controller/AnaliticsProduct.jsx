import React from 'react'
import "./AnaliticsProduct.css"
import productStore from '../libe/productStore'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,Tooltip,Legend,CartesianGrid} from "recharts"


function AnaliticsProduct() {
  const {Analitics}=productStore()
   const {getAnalitycsData,sales}=Analitics
  
 
  return (
    <div className='anlaitics-container'>
         <div className="allData">
          <ProducAnalitics num={getAnalitycsData.tuser} title={'Total user'} Icon={PeopleAltOutlinedIcon} />
          <ProducAnalitics num={getAnalitycsData.tproduct} title={'Total products'} Icon={Inventory2OutlinedIcon}/>
          <ProducAnalitics num={getAnalitycsData.tsalse} title={'Total sales'} Icon={ShoppingCartOutlinedIcon}/>
          <ProducAnalitics num={getAnalitycsData.trevenue} title={'Total revenue'}  Icon={AttachMoneyOutlinedIcon}/>
         </div>

         <div className="chart">
          <div className="item">
           <ResponsiveContainer height={'100%'} width={"100%"}>
            <LineChart data={sales}>
                 <CartesianGrid strokeDasharray='3 3' />
                 <XAxis dataKey="name" stroke='white'/>
                 <YAxis yAxisId={"left"} dataKey="sales" stroke='white'/>
                 <YAxis  yAxisId={"right"} orientation='right' dataKey="revenue" stroke='white'/>
                 <Tooltip/>
                 <Legend/>
                 <Line
                    type="monotone"
                   name='sales'
                   yAxisId={'left'}
                   stroke='dodgerblue'
                    dataKey='sales'
                    activeDot={{ r: 8 }}
             
                 />
                 <Line
                    type="monotone"
                   name='revenue'
                      // yAxisId={'right'}
                   stroke='mediumseagreen'
                    dataKey='revenue'
                    activeDot={{ r: 8 }}
             
                 />

            </LineChart>
           </ResponsiveContainer>
         </div>
         </div>
    </div>
  )
}

export default AnaliticsProduct


const  ProducAnalitics=({title,num,Icon})=>(
      <div className='eachItem'>
      <h3 style={{zIndex:"5"}}>{title}</h3>
      <h3>{num}</h3>

      {<Icon className={"icon"} />}
     </div>
)