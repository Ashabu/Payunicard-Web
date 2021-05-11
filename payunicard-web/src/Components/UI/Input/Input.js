import React, { useEffect, useRef }from 'react';
import './input.scss'
import Validation from '../InputValidation/Validation'

function Input(props) {
    const validateRef = useRef();
    useEffect(()=>{
        Validation.Set = validateRef;
        return () => Validation.removeValidate(validateRef)
    }, [])

    return (
        <div style={{display:'flex', flexFlow: 'column'}} ref= {validateRef}>
            <input {...props}  />
            <span style={{color: 'red'}}>{props.errormessage}</span>
        </div>    
    );
}

export default Input;