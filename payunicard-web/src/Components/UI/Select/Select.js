import React from 'react';
import './input.scss'

function Select (props) {
    return (
        <div>
            <input className='Input' type = 'select'{...props} />
        </div>
    );
}

export default Select;