import React, { useState } from 'react';
import Input from '../Input/Input';
import './select.scss';

var isFocused = false; 

 const Select = (props) => {
     console.log(props)
    //  const selected = (props.selected || "").toString()
    
    const [visible, setVisible] = useState(false); 
    const [search, setSearch] = useState('');
    const [blurTmout, setBlurTmout] = useState(null);

    // useEffect(() => {

    // },[selected])


    const handleOnBlur = () => {
        if(blurTmout) clearTimeout(blurTmout);
        setBlurTmout(setTimeout(()=>{ if(isFocused) return; setVisible(false); setSearch('')}, 200));
        
    }


    let  selectData = [];
    if(search !== '') {
        selectData = props.data.filter(el =>{return el.name.toLowerCase().includes(search.toLowerCase())})
    } else {
        selectData = props.data
    }

    
    let  selectList = null;
    let searchInput = null;

    if(props.search) {
        searchInput = (
            <Input value = {search} placeholder = 'Search' 
                onChange ={(e)=> setSearch(e.target.value)} 
                onFocus ={()=> { isFocused = true; }} 
                onBlur={() => { isFocused = false; handleOnBlur(); }} />
        )
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
            <div className = 'Selected' onClick = {() => setVisible(!visible)} onBlur = {handleOnBlur} tabIndex = '0'>
                {props.icon} {props.selected ? props.selected : props.placeholder}
            </div>
            {selectList}
        </div>
    );
}

export default React.memo(Select);