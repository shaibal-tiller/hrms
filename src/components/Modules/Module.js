import React from 'react'
import Header from '../../shared/Header'
import './module.css'
import LeaveForm from './Leave'
import Attendance from './Attendance'
import Requests from './Requests'
import Profile from './Profile'


const Module = ({ title = 'Module' }) => {

    return (
        <div className='h-[100vh] bg-[#000]' >
            <Header Title={" DUMMY " || title} />
            <hr />
            <div className=''>
                {title == 'Attendance' ? <Attendance /> : title == 'Profile' ? <Profile /> : title == 'Requests' ? <Requests /> : <LeaveForm />}

            </div>

        </div>
    )
}

export default Module