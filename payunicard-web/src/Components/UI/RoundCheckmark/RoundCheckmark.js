import React, {useState} from 'react';
import './roundCheckmark.scss';

const  RoundCheckmark = (props) => {
    
    return (
        <div className = 'rounded-checkbox'>
            <div className = 'round'>
            
                <input type = { props.checkType } onChange = {() => props.toggle(props.id)} checked = { props.checked } id = { props.id }/>
                <label htmlFor = { props.for }> </label>
            </div>
        </div>
    );
}

export default RoundCheckmark;