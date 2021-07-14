import React, {useEffect} from 'react';
import './roundCheckmark.scss';

const  RoundCheckmark = (props) => {

    return (
        <div className = 'rounded-checkbox'>
            <div className = 'round'>
            
                <input type = { props.checkType } onChange = {() => props.toggle(props.id)} checked = { props.checked } id = { props.id }/>
                <label htmlFor = { props.for }>{props.labelTitle} </label>
            </div>
        </div>
    );
}

export default RoundCheckmark;