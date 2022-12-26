import React from 'react'
import SelectDropDown from '../../utils/components/SelectDropDown'
import { useEffect, useState } from 'react'
import TextFieldInput from '../../utils/components/TextField'
import { Box, Button, FormControl } from '@mui/material'
import { blank_employee, position_structure } from '../../utils/dataModel'
import './login.css'
import { db } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import showToast from '../../utils/components/Toast'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [dept_key, set_dept_key] = useState("")
    const departments = Object.entries(position_structure).map(el => el[1].name)

    const  matchUser = (user, pass) => {
        const ref = db.ref(`/employees/${dept_key}/${user}`);

        ref.on("value", snapshot => {
            const user_details = snapshot.val()
            if (user_details) {
                if (user_details.password === pass) {
                    showToast('Logged In !','error')
                    navigate('/')
                }
                else {
                    showToast("Password Mismatch !",'error')
                }
            }
            else {
                showToast("NO USER WITH THIS ID !",'error')
            }


        })

    }


    const handleLogin = () => {
        if (data.user_name && data.password && data.department) {
             matchUser(data.user_name, data.password)

        }

    }
    const setter = (name, value) => {
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        if (data.department) {
            Object.entries(position_structure).map(el => {
                if (data.department === el[1].name) {
                    set_dept_key(el[0])
                }

            })
        }
    }, [data.department])

    return (<div>
        <Header Title='TILLER - HRMS' />
        <hr className='text-[#000]'/>
        <div className='card-container'>

            <div className='card'>
                <Box sx={{ '& > :not(style)': { gap: 2, } }}>
                    <Box
                        sx={{ display: 'flex', border: '1px solid #000', borderRadius: '8px', flexDirection: 'column', alignItems: 'center' }} >
                        <SelectDropDown
                            setter={setter}
                            label={'Select Department'}
                            name={'department'}
                            element={[""].concat(departments) || []}
                        />
                        <TextFieldInput
                            name="user_name"
                            required={true}
                            setter={setter}
                            label='User Name' />
                        <TextFieldInput
                            name="password"
                            required={true}
                            label='Password'
                            type='password'
                            setter={setter} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className=''
                            onClick={handleLogin}
                            sx={{ color: '#000', border: 'solid 1px #000', mt: 2, py: 1 }} size="small" variant="elevated">
                            Login
                        </Button>

                    </Box>
                </Box>
            </div>
        </div>
    </div>
    )
}

export default Login