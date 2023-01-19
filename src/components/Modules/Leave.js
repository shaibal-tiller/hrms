import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from '../../utils/components/DatePicker'
import TimePicker from '../../utils/components/TimePicker'
import SelectDropDown from '../../utils/components/SelectDropDown'
import TextField from '../../utils/components/TextField'
import { GetContext } from '../App/Context'
import axios from 'axios'
const LeaveForm = () => {
    const myContext = GetContext()
    const base_url = process.env.REACT_APP_BASE_URL
    const [errTxt, setErrTxt] = useState("")
    const [formData, setFormData] = useState({})
    const [userData, setUserData] = useState(myContext.userData)
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }
    const handleTypeSelect = (e) => {
        const x = e.target.parentElement
        let index = 0;
        while (x.children[index]) {
            x.children[index].style.backgroundColor = '#fff'
            index++
        }
        e.target.style.backgroundColor = '#00f'
        setFormData({ ...formData, 'leave_type': e.target.innerHTML })
    }
    useEffect(() => {


    }, [formData])
    const getFormedData = (data) => {

        let details = { employee_id: myContext.userData.employee_id }
        details.leave_category = data.leave_category;
        details.join_date = data.join_date
        details.cause_of_leave = data.cause_of_leave
        details.sup_name = data.sup_name

        if (data.leave_type === 'Half Day') {
            details.leave_type = `${data.leave_type}-${data.half_type === 'First Half' ? 1 : 2}`
            details.from_date = details.to_date = data.leave_date
            details.num_days = 0


        }
        else if (data.leave_type === 'Full Day') {
            details.leave_type = data.leave_type
            details.from_date = details.to_date = data.leave_date
            details.num_days = 1

        }
        else {
            details.leave_type = data.leave_type
            details.from_date = data.from_date
            details.to_date = data.till_date
            details.num_days = data.num_days

        }
        // setFormData({})
        return details

    }

    const handleSubmit = (e) => {
        if (formData.leave_category && formData.leave_date && formData.leave_type) {
            setErrTxt("")
            const leave_details = getFormedData(formData)

            // console.log(base_url);
            // uploadLeaveDetails(leave_details)

            axios.post(`${base_url}/select/addleavereq`, leave_details)
                .then(res => {
                    console.log(res.status);
                    console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            setErrTxt("Fillup Required Fields")
        }

    }


    return (
        <div className='w-full px-24 bg-[#fff] pb-2'>
            <div className='flex justify-around gap-3 my-2'>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Half Day</div>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Full Day</div>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Multiple Days</div>
            </div>
            <hr />
            <div className='grid grid-cols-1 lg:grid-cols-2 text-center'>

                <TextField
                    setter={handleChange}
                    className="text-[#000]"
                    name='name'
                    label='Employee Name'
                    d_value={userData.full_name}
                    disabled
                />
                <TextField
                    setter={handleChange}
                    className="text-[#000]"
                    name='department'
                    label='Department'
                    d_value={"RnD"}
                    disabled
                />


                <TextField
                    setter={handleChange}
                    className="text-[#000]"
                    name='position'
                    label='Designation'
                    d_value={"Software Developer"}
                    disabled
                />
                <TextField
                    setter={handleChange}
                    className="text-[#000]"
                    name='mobile'
                    label='Mobile No.'
                    d_value={"01523659845"}
                    disabled
                />


                <SelectDropDown
                    setter={handleChange}
                    label={'Leave Category'}
                    name="leave_category"
                    element={['Casual', 'Sick', 'Earned', 'L.W.P']}
                />
                {formData.leave_type === "Multiple Days" ? (<TextField
                    setter={handleChange}
                    label={'Number of Days'}
                    name="num_days"
                />) : (<></>)}


                {formData.leave_type == "Multiple Days" &&
                    <DatePicker
                        setter={handleChange}
                        label={'From'}
                        name='from_date' />

                }
                {formData.leave_type == "Multiple Days" &&
                    <DatePicker
                        setter={handleChange}
                        label={'Till'}
                        name='till_date' />
                }
                {formData.leave_type == "Full Day" &&
                    <DatePicker
                        setter={handleChange}
                        label={'Leave Date'}
                        name='leave_date' />

                }
                {formData.leave_type == "Half Day" &&
                    <DatePicker
                        setter={handleChange}
                        label={'Leave Date & Time'}
                        name='leave_date' />

                }
                {formData.leave_type == "Half Day" &&
                    <SelectDropDown
                        setter={handleChange}
                        element={["First Half", 'Second Half']}
                        name="half_type"
                        label={"Select Half of Day"} />}

                <DatePicker
                    setter={handleChange}
                    label={'Date of Joining'}
                    name={'join_date'} />
                <TextField
                    setter={handleChange}
                    label='Reason for Leave'
                    name='cause_of_leave'
                    multiline
                />

                <hr />

                <SelectDropDown
                    label={"Name of Supervisor"}
                    name={"sup_name"}
                    setter={handleChange}
                    element={['Rume', 'Kowshik']} />
                {formData.sup_name && (<TextField
                    name='sup_position'
                    label='Designation'
                    d_value={formData.sup_name}

                />)}
            </div>

            <hr />
            <div className=' mt-2 flex gap-4 px-2 justify-center text-red-600'>
                {errTxt}
            </div>
            <div className=' mt-2 flex gap-4 px-2 justify-center'>
                <Button sx={{ backgroundColor: '#575757' }} onClick={handleSubmit}>Submit to HR</Button>
                <Button sx={{ backgroundColor: '#575757' }} onClick={handleSubmit}>Submit to Supervisor</Button>

            </div>
        </div>
    )
}

export default LeaveForm