import React, { useState } from 'react';
import './select.scss';


 const Select = (props) => {
    
    const [visible, setVisible] = useState(false);
  
    return (
        <div >
            <div className='Selected' onClick={() => setVisible(!visible)}>
                {props.selected ? props.selected : 'select'}
            </div>
            <div className='SelectList'>
                {visible && props.data.map(el => {
                    return props.render(el, setVisible)
                })}
            </div>
        </div>
    );
}

export default Select;