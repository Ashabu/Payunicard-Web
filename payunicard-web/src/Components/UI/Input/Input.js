import React, { useEffect, useRef }from 'react';
import './input.scss'
import Validation from '../InputValidation/Validation'

function Input(props) {
    const validateRef = useRef();
    useEffect(()=>{
        Validation.Set = validateRef;
        return () => Validation.removeValidateMe(validateRef)
    }, [])

    return (
        <div ref= {validateRef}>
            <input {...props}  />
            <span style={{color: 'red'}}></span>
        </div>    
    );
}

export default Input;