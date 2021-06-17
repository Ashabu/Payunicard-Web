import React, { useState, useEffect, Fragment} from 'react';
import Input from '../Input/Input';
import './select.scss';

var isFocused = false; 

 const Select = (props) => {
    
    const [visible, setVisible] = useState(false); 
    const [search, setSearch] = useState('');
    const [blurTmout, setBlurTmout] = useState(null);

    // useEffect(() => {
    //     return () => clearTimeout(blurTmout)
    // },[props.selected, blurTmout])


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
            <div className= {props.listClass || 'SelectList'}>
                
                {searchInput}
                {visible && selectData.map(el => {return props.display(el, setVisible)})}
            </div>
        )
    }
    return (
        <div style = {{position: 'relative', width: '100%'}}>
            <div  className ={ props.selectClass ||'Selected'} onClick = {() => setVisible(!visible)}  tabIndex = '0' onBlur = {handleOnBlur }> 
            <img style = {{position: 'absolute', top: 20, right: 15,}} src = '../../../Assets/Images/arrow_down.png' alt = 'icon' />
                 {props.selected}
            </div>
            {selectList}
        </div>
    );
}

export default React.memo(Select);