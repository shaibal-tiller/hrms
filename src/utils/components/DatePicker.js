import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker,DesktopDateTimePicker } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { Box } from '@mui/material';


const DatePicker = ({ label, name, setter }) => {
    const getFormattedDate = (dateValue) => {
        const parsedDate = new Date(dateValue)
        return  (parsedDate.getMonth() + 1) + "-" +parsedDate.getDate() + "-" + parsedDate.getFullYear()
    }

    const [value, setValue] = useState()
    const handleChange = (newValue) => {
        setValue(newValue)
        setter(name, getFormattedDate(newValue))
    }


    return (
        <LocalizationProvider  dateAdapter={AdapterDayjs} >
            <Box size='small'
                noValidate
                autoComplete="off"
                sx={{m: 1}}>
                <FormControl sx={{ m: 1,minWidth:'35ch' }} >
                    <DesktopDatePicker
                        label={label}
                        name={name || label || "date"}
                        inputFormat="DD/MM/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField size='small' {...params} />}
                    />
                </FormControl>
            </Box>
        </LocalizationProvider>
    )
}

export default DatePicker