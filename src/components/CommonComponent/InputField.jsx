import {TextField}  from '@mui/material';

const InputField =({id, value, size,varient , onchange, onclick}) => {
    return(
        <TextField  
        id={id} 
        size="small"
        varient="outlined"
        onchange={onchange}
        onclick={onclick}
        margin='dense'
        fullWidth
        sx={{ '& .MuiOutlinedInput-root': { '& fieldset' : { borderColor: '#2465E9',padding:"10px",borderRadius:"5px",color:"#80808099",fontSize:"12px"} } }}
        />
            
    )
}
export default InputField;

