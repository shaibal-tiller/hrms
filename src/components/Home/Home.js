import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import { GetContext } from '../App/Context'
import Login from '../Login/Login'
import Register from '../Login/Register'
import LeaveModule from '../Modules/Module'
import showToast from '../../utils/components/Toast'
import './home.css'

const Home = () => {
  const navigate = useNavigate()
  const myContext = GetContext()
  const [userData, setUserData] = useState(myContext.userData)
  const handlePortalSelection = (e) => {
    console.log(e.target.value);
    switch (e.target.innerHTML) {
      case 'Leave Portal':
        navigate('/leave');
        break;
      case 'Attendance Portal':
        navigate('/attn')
        break;
      case 'My Profile':
        navigate('/profile')
        break;
      case 'Approve Request':
        navigate('/requests')
        break;
      default:
        break;
    }
  }
  const handleLogout = () => {
    console.log("OUT");
    myContext.setUserData([])
    setUserData({})
    navigate('/')
  }
  useEffect(() => {
    // myContext.userData
    if (userData) {
      showToast(`Welcome Mr. ${userData.full_name} !!`, 'success')

    }
    else {
      setTimeout(() => {
        showToast("Not Logged In !!", 'error')
        navigate('/login')
      }, 200);
    }


  }, [userData])




  return (
    <div className='h-[100vh]'>
      <Header />
      <hr className='text-[#000]' />
      {userData && Object.entries(userData).map(el => {

        return (<p className='inline'> [ {el[0]} {el[1]} ] </p>)
      })}
      <div className='module-container '>
        <div className='module-card' onClick={handlePortalSelection}>
          Leave Portal
        </div>
        <div className='module-card' onClick={handlePortalSelection}>
          Attendance Portal
        </div>
        <div className=' module-card' onClick={handlePortalSelection}>
          My Profile
        </div>
        <div className=' module-card' onClick={handlePortalSelection}>
          Approve Request
        </div>


      </div>
      <button onClick={handleLogout} className=' text-[#000] py-1  px-2  rounded-lg absolute left-2 bottom-[2%] bg-[#faeded]'>LOGOUT</button>
    </div>
  )
}

export default Home