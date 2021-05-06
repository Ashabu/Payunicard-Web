import React, {useState} from 'react';
//import './roundCheckmark.scss';

const  RoundCheckmark = (props) => {
    
    return (
        <div className = 'rounded-checkbox'>
            <div className = 'round'>
                <input type = {props.checkType} onChange = {props.clicked} checked = {props.checked}/>
                {/* <label htmlFor = {props.for}>rounded checkbox</label> */}
            </div>
        </div>
    );
}

export default RoundCheckmark;