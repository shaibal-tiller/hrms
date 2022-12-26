import TextFieldInput from '../../utils/components/TextField'
import { Box, Button, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './login.css'
import DatePicker from '../../utils/components/DatePicker'
import SelectDropDown from '../../utils/components/SelectDropDown'
import { blank_employee } from '../../utils/dataModel.js'
import { db } from '../../utils/firebase.js'
import { position_structure } from '../../utils/dataModel.js'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import showToast from '../../utils/components/Toast'


const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ ...blank_employee })
  const departments = Object.entries(position_structure).map(el => el[1].name)
  const [positions, setPositions] = useState([])
  const [dep_key, set_dep_key] = useState("")

  const setter = (name, value) => {
    setData({ ...data, [name]: value })
  }

  const uploadUser = () => {
    const token_id = `${data.f_name}-${data.id}`
    db.ref(`/employees/${dep_key}/${token_id}`)
      .set(data)
      .catch((e) => { console.log(e); });

  }
  const handleRegistraton = () => {
    // if (data.f_name && data.l_name && data.department && data.designation &&
    //   data.email && data.phone && data.address && data.join_date
    //   && data.password && data.confirm_password) {
    //   console.log(data);
    // }


    if (data.f_name && data.l_name && data.department && data.position) {
      uploadUser()
      setData({})
      showToast("Registration Successful !","success")
      navigate('/login')
    }
    // if (data.f_name) {
    //   console.log(data);
    //   console.log(dep_key);
    // }
    else {
      console.log("required missing info");
    }

  }

  useEffect(() => {
    if (data.department) {
      let temp = ""
      Object.entries(position_structure).map((el, index) => {
        if (el[1].name == data.department) {
          temp = (el[0]);
          set_dep_key(el[0])


        }

      })
      // console.log(position_structure[dep_key].positions);
      setPositions(position_structure[temp].positions);
    }

  }, [data.department])

  return (<div>
    <Header Title='TILLER - HRMS' />
    <hr className='text-[#000]'/>
    <div className='card-container'>
      <div className='card'>

        <Box sx={{ '& > :not(style)': { gap: 2, } }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TextFieldInput name="f_name" required={true} setter={setter} label='First Name' />
            <TextFieldInput name="l_name" setter={setter} label='Last Name' />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <SelectDropDown
              setter={setter}
              label={'Select Department'}
              name={'department'}
              element={departments || []}
            />
            <SelectDropDown
              setter={setter}
              label={"Position"}
              name={'position'}
              element={positions}
            />

          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TextFieldInput name="email" required={true} setter={setter} label='Email' type={"email"} />
            <TextFieldInput name="phone" setter={setter} label='Phone' />
          </Box>
          <FormControl fullWidth  >
            <TextFieldInput name="address" setter={setter} multiline={true} label='Address' type='address' />
            <TextFieldInput name="id" setter={setter} disabled label='Employee Id' d_value={blank_employee.id} />
          </FormControl>

          <Box sx={{ width: '48%' }} >
            <DatePicker name="join_date" setter={setter} label='Join Date' />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TextFieldInput name="password" setter={setter} label='Password' type={"password"} />
            <TextFieldInput name="confirm_password" setter={setter} label='Confirm Password' type={"password"} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleRegistraton} sx={{ color: '#000', border: 'solid 2px #000', }} size="small" variant="elevated">
              Register
            </Button>

          </Box>
        </Box>


        {/* 
     'firstName': '',
    'lastName': '',
    'address':"",
    'userName': '',
    'designation': '',
    'employeeID': "",
    'email': '',
    'phone': '',
    'joinDate': "",
    'password': '',
    'department': '',
    'id': "" */}
      </div>

    </div>
  </div>
  )
}

export default Register