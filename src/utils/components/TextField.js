import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const TextFieldInput = ({ placeholder = '', type = "text", label = "", name = "", disabled = false, d_value = false,
  required = false, Icon = AccountCircle, multiline = false, width = "5", setter }) => {


  const [text, setText] = React.useState("")

  const handleChange = (e) => {
    const pat = "[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}"
    if (type == 'email' && !(e.target.value).match(pat)) {
      setText("Enter Proper Format")
    }
    else if (required && e.target.value.trim() === "") {
      setText("This field is empty")
    }
    else {
      setter(e.target.name, e.target.value)
      setText("")
    }

  }
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, },
      }}
      noValidate
      autoComplete="off">
      <FormControl size='small' sx={{ minWidth: '37ch',m:1 }}>

        <TextField
          sx={{ minWidth: "20ch", m: 1, }}
          onChange={handleChange}
          placeholder={placeholder}
          error={text.length > 0}
          helperText={text}
          name={name}
          disabled={disabled}
          size={'small'}
          variant="outlined"
          label={label}
          multiline={multiline}
          type={type}
          defaultValue={d_value ? d_value : ""}
          required={required}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon />

              </InputAdornment>
            ),
          }}

        >

        </TextField>
      </FormControl></Box>

  );
}
export default TextFieldInput