import React, {useState, useEffect, useRef }from 'react';
import './input.scss'
import Validation from '../InputValidation/Validation'

const AppInput = (props) => {

    const [ isActive, setIsActive ] = useState(false);
    const [ value, setValue ] = useState('');

    const validateRef = useRef();
    useEffect(()=>{
        Validation.Set = [validateRef, props.groupid]
        
       return () => Validation.removeValidate(validateRef)
    }, [])

    useEffect(() => {
        handleTextChange(props.value)
    }, [props.value]);


    const handleTextChange = (value) => {
        
        if(value !== '') {
            setIsActive(true)
        } else {
            setIsActive(false);
        }
    }

    return (
        <div className = 'app-input' ref= {validateRef}>
            <input  {...props}/>
            <label className={ isActive ? "Active" : ""} >{props.labeltitle}</label>
            <span style={{color: 'red'}}>{props.errormessage}</span>
        </div>    
    );
}

export default AppInput;