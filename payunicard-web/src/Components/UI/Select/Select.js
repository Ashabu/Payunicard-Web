import React, { useState } from 'react';
import Input from '../Input/Input';
import './select.scss';


 const Select = (props) => {
    
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');


    let  selectData = [];
    if(search !== '') {
        selectData = props.data.filter(el =>{return el.name.toLowerCase().includes(search.toLowerCase())})
    } else {
        selectData = props.data
    }

    
    let  selectList = null;
    let searchInput = null;

    if(props.search) {
        searchInput = (<Input value = {search} placeholder = 'Search' onChange ={(e)=> setSearch(e.target.value)}/>)
    }
    if(visible) {
        selectList = (
            <div className='SelectList'>
                {searchInput}
                {visible && selectData.map(el => {return props.render(el, setVisible)})}
            </div>
        )
    }
  
    return (
        <div >
            <div className = 'Selected' onClick = {() => setVisible(!visible)} onBlur = {() => setVisible(false)}>
                {props.selected ? props.selected : props.placeholder}
            </div>
            {selectList}
        </div>
    );
}

export default Select;