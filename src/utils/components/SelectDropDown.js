import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import { Box } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


const SelectDropDown = ({ setter, element = [], name, label,  multiple = false, disabled = false, selected }) => {


    const [value, setValue] = useState(!multiple ? "" : [])

    const handleChange=(e)=>{
            setValue(e.target.value);
            setter(e.target.name,e.target.value)
    }
    return (
        <Box
            sx={{
                '& > :not(style)': { m: 1 ,minWidth:'30ch'},
            }}
            noValidate
            autoComplete="off">
            <FormControl size='small'>
                <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
                <Select
                    disabled={selected && disabled}
                    sx={{ "&:hover": { bgcolor: 'transparent' } }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    value={disabled ? selected : value ? value : ""}
                    label={label}
                    onChange={handleChange}
                    displayEmpty
                >

                    {element.length > 0 ? element.map((el, index) => {
                       
                            return (<MenuItem key={index} value={el}>{el}</MenuItem>)
                    }):<MenuItem key={"d"} value={""}>{""}</MenuItem>}
                  


                </Select>
            </FormControl>
        </Box>)
}

export default SelectDropDown