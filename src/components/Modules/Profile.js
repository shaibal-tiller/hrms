import React, { useEffect } from 'react'
import { GetContext } from '../App/Context'

const Profile = () => {

    const myContext = GetContext()
    const userData = myContext.userData
    useEffect(() => {

    }, [])
    return (
        <div className='text-center'>
            {Object.entries(userData).map(el => { return (<div className=''>{el[0]} : {el[1]}</div>) })}
        </div>
    )
}

export default Profile