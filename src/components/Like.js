import React from 'react'
import {SlLike} from 'react-icons/sl'
import { useState } from 'react';
const Like = ({callback,bg_color ="bg-blue-200",fontSize = "100px",border_color="border-blue-500",text_color="text-blue-500",size="200px",fill="fill-blue-500",Icon=SlLike, bookmarked})=> {
  const [selection, setselection] = useState(bookmarked);
    const clickhandler = () =>{
        setselection((selection)=>{
            if(callback){
              callback()
            }
            return !selection 
        })
    }
  return (
    <div style ={{width:size,height:size,cursor:"pointer"}} className={` relative`}>
    <div className={(selection ? `border-2 ${border_color} animate-[ping_0.5s_ease-in-out_reverse]`:"")+ " z-[1]  inset-0 flex justify-center items-center rounded-full absolute   "}>  </div>
    <div className={selection?` ${border_color}  border-4 inset-0 flex justify-center items-center rounded-full absolute animate-[ping_0.5s_ease-in-out_1]`:'scale-0'}>  </div>
        <div style={{width:"100%",height:"100%",display:'flex',alignItems:"center",justifyContent:"center",}} 
        className= {selection ? `${text_color} rounded-full ${bg_color} border-2 duration-700 ${border_color} z-[2] relative` 
        : " z-[2] absolute " } 
        onClick={clickhandler} >
        <Icon className={selection?`${fill}`:`fill-current hover:${fill} `} style={{fontSize:fontSize,position:"relative",}} />
        </div>
  
    </div>
  )
}

export default Like;
