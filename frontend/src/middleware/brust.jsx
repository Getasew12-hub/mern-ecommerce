import React from 'react'
import "./brust.css"
import { useRef } from 'react'
import { useEffect } from 'react';


function Brust() {
const brustconstine=useRef();
useEffect(()=>{

function createBrust(){
    let count=1;

const color=()=>{
  const colors = ['#ff0080', '#ff4d4d', '#ffd966', '#66ff66', '#4d4dff', '#cc66ff','white'];
            return colors[Math.floor(Math.random()*colors.length)];
    
  
}

    while(count<150){
        const bust=document.createElement('div');
        bust.classList.add("brust");

       
        const randomLeft=Math.random()*50+25;
        
        bust.style.top=`${0}px`;
        bust.style.left=`${randomLeft}%`;


        const heightWidth=Math.random()*8+4;
        bust.style.height=`${heightWidth}px`;
        bust.style.width=`${heightWidth}px`;
        bust.style.background=color()

        const transformY=Math.random()*50+30;
        const transformX=Math.random()*400-200;
        const rotate=Math.random()*360
        bust.style.setProperty(`--x`,`${transformX}px`)
        bust.style.setProperty(`--y`,`${transformY}vh`)
        bust.style.setProperty(`--rot`,`${rotate}deg`)    

        bust.style.animation=`burst ${Math.random()*0.5+2}s ease-in-out forwards`
    
        brustconstine.current.appendChild(bust)
count++;
    }
}

createBrust()
},[])
  return (
    <div className='brust-container' ref={brustconstine}> 
      
    </div>
  )
}

export default Brust
