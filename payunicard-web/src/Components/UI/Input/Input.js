import React, { useEffect }from 'react';
import './input.scss'
import Validation from '../InputValidation/Validation'

function Input(props) {
    useEffect(()=>{
        Validation.Set = Input;
    }, [])

    return (
        <div>
            <input {...props} />
        </div>    
    );
}

export default Input;