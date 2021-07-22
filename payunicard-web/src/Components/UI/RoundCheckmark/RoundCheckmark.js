import React, {useEffect} from 'react';
import './roundCheckmark.scss';

const  RoundCheckmark = (props) => {
    const {style, toggle, id,  checked, labelTitle } = props;

    return (
        <div className = 'rounded-checkbox' style = {style} >
            <div className = 'round'>
                <input type= 'checkbox' onChange = {() => toggle(id)} checked = { checked } id = { id }/>
                <label htmlFor = { props.for }> </label>
                {labelTitle? 
                <span onClick = {toggle}>{labelTitle}</span> : null}
            </div>
        </div>
    );
}

export default RoundCheckmark;