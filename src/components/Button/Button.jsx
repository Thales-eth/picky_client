import './Button.css'
import React from 'react'
import Button from '@mui/material/Button';

const BasicButton = ({ children }) => {
    return (
        <Button variant="contained" type='submit'>{children}</Button>
    )
}

export default BasicButton