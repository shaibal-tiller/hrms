import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const NotFound = () => {
const navigate= useNavigate();
  return (
    <div className="flex justify-center">
    <Button size='large' onClick={()=>{navigate("/")}} sx={{'z-index':'10',position:'absolute',background: '#cbe2d5', fontSize:'20px',mt:"10px"}}>Go to Home</Button>
    <h1 className=' absolute z-10 text-3xl font-bold bg-[#cbe2d5] flex justify-center mt-[48%] w-72 py-4 rounded-xl bg-opacity-70' style={{color:'#000'}}>PAGE NOT FOUND</h1>
    <img alt='404_image' style={{position:'fixed',height:'100%' ,width:'100%'}}  src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=2000'/>
    
    </div>
  )
}

export default NotFound