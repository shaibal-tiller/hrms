import { Box, Button, FormControl } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../shared/Header'
import DatePicker from '../../utils/components/DatePicker'
import SelectDropDown from '../../utils/components/SelectDropDown'
import TextFieldInput from '../../utils/components/TextField'
import { blank_employee } from '../../utils/dataModel.js'
import './login.css'


const Register = () => {
  const base_url = process.env.REACT_APP_BASE_URL

  const [departments, setDepartments] = useState([])
  const [designations, setDesignations] = useState([])
  const [empId, setEmpId] = useState(0)
  const [user_name, setuser_name] = useState("")
  useEffect(() => {
    axios.get(base_url + "/select/getmaxid")
      .then((res) => {
        console.log(res.data + 1);
        setEmpId(res.data + 1)
      })
    const reg_url = base_url + "/select/departments"
    setDesignations([""])
    axios.get(reg_url)
      .then(res => {
        setDepartments(res.data)
      })
    // res.data.map(el => {
    //   tmp.push(el.department_name)
    // })
    // setDepartments(tmp)
    // })
  }, [])
  const navigate = useNavigate()
  const [data, setData] = useState({ ...blank_employee })
  //Object.entries(position_structure).map(el => el[1].name)
  const [positions, setPositions] = useState([])
  const [dep_key, set_dep_key] = useState("")

  const setter = (name, value) => {
    setData({ ...data, [name]: value })
  }

  const uploadUser = () => {
    const user_info = {
      employee_id: data.id.split('-')[1] || "Tiller-00", full_name: data.first_name.trim() + " " + data.last_name.trim(),
      email: data.email, phone: data.phone, designation_id: data.designation,
      edu_inst_year: data.edu, department_id: data.department, address: data.address,
      join_date: data.join_date, dob: data.dob, blood_group: data.blood_group
    }
    console.log(user_info);

    axios.post(`${base_url}/select/employees`, user_info)
      .then(res => {
        console.log(res)
        // setData({})
        // showToast("Registration Successful !", "success")
        // navigate('/login')
      })
  }
  const handleRegistraton = () => {
    // if (data.first_name && data.last_name && data.department && data.designation &&
    //   data.email && data.phone && data.address && data.join_date
    //   && data.password && data.confirm_password) {
    //   console.log(data);
    // }
    uploadUser()

    // setData({})
    // showToast("Registration Successful !", "success")
    // navigate('/login')

    // else {
    //   console.log("required missing info");
    // }
    const temp = {
      employee_id: data.id, name: data.first_name + data.last_name,
      email: data.email, phone: data.phone, designation_id: data.designation,
      edu_inst_year: data.edu, department_id: data.department, address: data.address,
      join_date: data.join_date, dob: data.dob, blood_group: data.blood_group
    }
    // api/v1/select
    // axios.post(`${base_url}/select/employees`, temp)
    //   .then(res => console.log(res))

  }


  useEffect(() => {
    // if (data.department) {
    //   let temp = ""
    //   Object.entries(position_structure).map((el, index) => {
    //     if (el[1].name == data.department) {
    //       temp = (el[0]);
    //       set_dep_key(el[0])
    //     }

    //   })
    //   // console.log(position_structure[dep_key].positions);
    //   setPositions(position_structure[temp].positions);
    // }

    if (data.department) {
      axios.get(base_url + '/select/departments/' + data.department)
        .then(res => {
          setDesignations(res.data)
        })
    }
  }, [data.department])

  useEffect(() => {
    console.log(data.designation);
  }, [data.designation])
  useEffect(() => {
    if (data.last_name && data.department && data.employee_id)
      console.log(data.department + "-" + data.last_name + "-" + data.employee_id);
    // setuser_name(data.department + "-" + data.last_name + "-" + empId)
  }, [data.last_name, data.department, data.employee_id])
  return (<div>
    <Header />
    <hr className='text-[#000]' />
    <div className='card-container'>
      <div className='card'>

        <TextFieldInput name="first_name" required={true} setter={setter} label='First Name' />
        <TextFieldInput name="last_name" setter={setter} label='Last Name' />


        <SelectDropDown
          setter={setter}
          label={'Select Department'}
          name={'department'}
          element={departments || []}
        />
        <SelectDropDown
          setter={setter}
          label={"Designation"}
          name={'designation'}
          element={designations || []}
        />


        <TextFieldInput name="edu" required={true} placeholder={'Institute-Year'} setter={setter} label='Institute & Passing Year' type={"text"} />
        <DatePicker name="dob" setter={setter} label='Date of Birth' />


        <TextFieldInput name="email" required={true} setter={setter}
          label='Email' type={"email"} />
        <TextFieldInput name="phone" setter={setter} label='Phone' />


        <TextFieldInput name="address" setter={setter} multiline={true} label='Address' type='address' />



        {data.last_name && data.department && data.employee_id && <TextFieldInput name='user_name' setter={setter} label={'User Name'} d_value={empId} />}
        <TextFieldInput name="id" setter={setter} label='Employee Id' d_value={"Tiller-" + empId} />
        {/* <TextFieldInput name='' sx={{ width: '150px', height: '80px' }} value={user_name.toUpperCase()} /> */}



        <DatePicker name="join_date" setter={setter} label='Join Date' />
        <SelectDropDown
          setter={setter}
          label={"Blood Group"}
          name={'blood_group'}
          element={['A+', "B+", "AB+", "O+", 'A-', "B-", "AB-", "O-"]}
        />


        <TextFieldInput name="password" setter={setter} label='Password' type={"password"} />
        <TextFieldInput name="confirm_password" setter={setter} label='Confirm Password' type={"password"} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleRegistraton} sx={{ color: '#000', border: 'solid 2px #000', }} size="small" variant="elevated">
            Register
          </Button>

        </Box>



        {/* 
     'firstName': '',
    'lastName': '',
    'address':"",
    'user_name': '',
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