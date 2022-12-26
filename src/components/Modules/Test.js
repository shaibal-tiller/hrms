import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from '../../utils/components/DatePicker'
import TimePicker from '../../utils/components/TimePicker'
import SelectDropDown from '../../utils/components/SelectDropDown'
import TextField from '../../utils/components/TextField'
const FieldCheck = ({ stepNo = 0, }) => {

    const [formData, setFormData] = useState({})
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

        console.log(formData);
    }, [formData])
    return (
        <div className='w-full px-24'>
            <div className='flex justify-around gap-3 my-2'>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Half Day</div>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Full Day</div>

                <div onClick={handleTypeSelect} className='w-[30%] py-1 bg-[#1ecece] cursor-pointer text-black text-center text-2xl font-semibold'>Multiple Days</div>
            </div>
            <hr />
            <div className='flex justify-between'>
                <TextField
                    setter={handleChange}
                    className="text-[#000]"
                    name='name'
                    label='Employee Name'
                    d_value={"Shoisab Buiyan"}
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
            </div>
            <div className='flex justify-between'>
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
            </div>
            <div className='flex justify-between'>
                <SelectDropDown
                    setter={handleChange}
                    label={'Leave Category'}
                    name="leave_category"
                    element={['Casual', 'Sick', 'Earned', 'L.W.P']} />
                {formData.leave_type === "Multiple Days" ? (<TextField
                    setter={handleChange}
                    label={'Number of Days'}
                    name="num_days"
                />) : (<></>)}
            </div>

          { formData.leave_type=="Multiple Days" && <div className='flex justify-between'>
                <DatePicker
                    setter={handleChange}
                    label={'From'}
                    name='from_date' />
                <DatePicker
                    setter={handleChange}
                    label={'Till'}
                    name='till_date' />
            </div>}
            { formData.leave_type=="Full Day" && <div className='flex justify-between'>
                <DatePicker
                    setter={handleChange}
                    label={'Leave Date'}
                    name='leave_date' />
                
            </div>}
            { formData.leave_type=="Half Day" && <div className='flex justify-between'>
                <DatePicker
                    setter={handleChange}
                    label={'Leave Date nd Time'}
                    name='leave_date' />
                    
                <SelectDropDown
                setter={handleChange}
                element={["First Half",'Second Half']}
                name="half_type"
                label={"Select Half of Day"}/>
                    
            </div>}
            <div className='flex justify-between'>
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
            </div> 
            <hr />
            <div className='flex justify-between'>
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
            <div className=' mt-2 flex gap-4 px-2 justify-center'>
                <Button sx={{ backgroundColor: '#575757' }}>Submit to HR</Button>
                <Button sx={{ backgroundColor: '#575757' }}>Submit to Supervisor</Button>

            </div>
        </div>
    )
}

export default FieldCheck