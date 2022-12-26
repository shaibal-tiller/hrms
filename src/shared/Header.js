import React from 'react'
import logo from '../images/logo.png'
import  '../styles/header.css'

const Header = ({ Title = "HRMS" }) => {


  return (
    <div className='header-container'>
    
      <div className='logo-container '>
        <a target="_blank"  href='https://tiller.com.bd'>
          <img alt='Tiller Logo' src={logo} className="logo" />
        </a>
      </div>
      
      <div className='header-title'>{Title}</div>
     
    </div>
  )
}

export default Header