import React, { useEffect, useRef }from 'react';
import './input.scss'
import Validation from '../InputValidation/Validation'

function Input(props) {
    const validateRef = useRef();
    useEffect(()=>{
        Validation.Set = [validateRef, props.groupid]
        
       return () => Validation.removeValidate(validateRef)
    }, [])

    return (
        <div style={{display:'flex', flexFlow: 'column', width: '100%'}} ref= {validateRef}>
            <input {...props}  />
            <span style={{color: 'red'}}>{props.errormessage}</span>
        </div>    
    );
}

export default Input;