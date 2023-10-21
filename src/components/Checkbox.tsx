
import { Checkbox } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'


interface CheckboxProps {
  label: string, 
  setChecked: Dispatch<SetStateAction<boolean>>
  isChecked: boolean 
}


const MyCheckbox: React.FC<CheckboxProps> = ({label, setChecked, isChecked}) => {


  return (
    <div className='checkbox-container'>
      <Checkbox checked={isChecked} onChange={() => setChecked(prev => !prev)} sx={{color:'gray','&.Mui-checked': {color: '#a5ffaf'}}}/>
      <label>{label} {isChecked ?" (True)": " (False)"}</label>
    </div>
  )
}

export default MyCheckbox