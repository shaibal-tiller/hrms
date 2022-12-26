import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import Login from '../Login/Login'
import Register from '../Login/Register'
import LeaveModule from '../Modules/Module'
import './home.css'

const Home = () => {
  const navigate = useNavigate()
  const handlePrtalSelection = (e) => {

    switch (e.target.innerHTML) {
      case 'Leave Portal':
        navigate('/leave');
        break;
        default:
          console.log(e.innerHTML);
        
          break;
    }
  }

  return (
    <div className='h-[100vh]'>
      <Header />
      <hr className='text-[#000]' />
      <div className='module-container '>
        <div defaultValue={'leavse'} className='module-card' onClick={handlePrtalSelection}>
          Leave Portal
        </div>
        <div className='module-card'>
          Attendance Portal
        </div>


      </div>
    </div>
  )
}

export default Home