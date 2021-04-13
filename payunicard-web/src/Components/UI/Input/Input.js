import React from 'react';
import './input.scss'

function Input(props) {
    return (
        <div>
            <input className='Input' {...props} />
        </div>
    );
}

export default Input;