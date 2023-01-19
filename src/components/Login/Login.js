import React from 'react'
import SelectDropDown from '../../utils/components/SelectDropDown'
import { useEffect, useState } from 'react'
import TextFieldInput from '../../utils/components/TextField'
import { Box, Button, FormControl } from '@mui/material'
import './login.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import showToast from '../../utils/components/Toast'
import axios from 'axios'
import { GetContext } from '../App/Context'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [dept_key, set_dept_key] = useState("")
    const [departments, setDepartments] = useState([])
    const [errtxt, setErrtxt] = useState("")
    const base_url = process.env.REACT_APP_BASE_URL
    const myContext = GetContext()
    // const departments = Object.entries(position_structure).map(el => el[1].name)

    const matchUser = (user, pass) => {
        const user_details = []
        if (user_details) {
            if (user_details.password === pass) {
                showToast('Logged In !', 'error')
                navigate('/')
            }
            else {
                showToast("Password Mismatch !", 'error')
            }
        }
        else {
            showToast("NO USER WITH THIS ID !", 'error')
        }
    }


    const handleLogin = () => {
        if (data.department) {
            if (data.user_name) {
                if (data.password) {
                    const login_data = {
                        user_name: data.department + "-" + data.user_name,
                        password: data.password,
                    }
                    axios.post(`${base_url}/select/login`, login_data)
                        .then(res => {
                            console.log(res.data.length);
                            if (res.data.length) {
                                myContext.setUserData(res.data[0])
                                setErrtxt("")
                                showToast('Logged In !', 'success')
                                setTimeout(() => {
                                    navigate('/')
                                }, 1000);

                            }
                            else {
                                setErrtxt("WRONG CREDENTIAL")
                                showToast('WRONG CREDENTIAL', 'error')
                            }
                        })
                }
                else {
                    setErrtxt("Enter Password!")
                    showToast('Enter Password!', 'error')
                }
            }
            else {
                setErrtxt("Enter User Name!")
                showToast('Enter User Name!', 'error')
            }

        }
        else {
            setErrtxt("Department not selected!")
            showToast('Select Department!', 'error')
        }


        // if (data.user_name && data.password && data.department) {
        //     matchUser(data.user_name, data.password)
        // }

    }
    const setter = (name, value) => {
        setData({ ...data, [name]: value })
    }

    useEffect(() => {

        axios.get(base_url + '/select/departments')
            .then(res => {

                setDepartments(res.data)
            })
    }, [])
    return (<div>
        <Header />
        <hr className='text-[#000]' />
        <div className='card-container'>
            <div className='card-login grid grid-cols-1'>
                <div>

                    <Box
                        sx={{ display: 'flex', border: '1px solid #000', flexDirection: 'column', alignItems: 'center' }} >
                        <SelectDropDown
                            setter={setter}
                            label={'Select Department'}
                            name={'department'}
                            element={departments || []}
                        />
                        <TextFieldInput
                            name="user_name"
                            placeholder={data.department}
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
                    <Box className='text-center' sx={{}}>
                        <Button className=''
                            onClick={handleLogin}
                            sx={{ color: '#000', border: 'solid 1px #000', mt: 2, py: 1 }} size="small" variant="elevated">
                            Login
                        </Button>
                        <a className='block text-blue-700' href='/register'>Not logged in? register As TILLER Employee</a>

                    </Box>
                    {errtxt.length && <p className=' text-center text-red-500'>{errtxt}</p>}

                </div>
            </div>
        </div>
    </div>
    )
}

export default Login