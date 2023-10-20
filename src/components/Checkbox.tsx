
import { Checkbox } from '@mui/material'


interface CheckboxProps {
  label: string
}


const MyCheckbox: React.FC<CheckboxProps> = ({label}) => {
  return (
    <div className='checkbox-container'>
    <Checkbox sx={{color:'gray','&.Mui-checked': {color: '#a5ffaf'}}}/>
    <label>{label}</label>
    </div>
  )
}

export default MyCheckbox