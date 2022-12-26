import React from 'react'
import Header from '../../shared/Header'
import './module.css'
import FieldCheck from './Test'


const Module = ({ title = 'Module' }) => {
   
    return (
        <div>
            <Header Title={title} />
            <hr />
            <div className=''>
               <FieldCheck
               />
            </div>

        </div>
    )
}

export default Module