import React, {useState, useRef, useContext} from 'react';
import './payment.scss';
import PropTypes from 'prop-types';
import { Icon ,RoundCheckmark } from '../UI/UiComponents';
import { formatNumber } from '../../Services/CommonFunctions';


const  PayAllTemplate =(props) => {
    const { imageUrl, templName, abonentCode,  debt , payTempID, checked } = props.template;
    const [ editAmmount, setEditAmmount ] = useState(false);
    const [ debtAmmount, setNewAmmount ] = useState(Math.abs(debt))


    const test = (val) => {
        setEditAmmount(false);
        props.editDebt(val);

    }

    return (
        <div className = 'PayAllTemplate'>
            <div className = 'checkmark'>
                <RoundCheckmark checkType = 'checkbox' toggle = { props.onToggle }  checked  = { checked } id = { payTempID } for = { payTempID }/>
            </div>
            <div className = 'templImg' style={{width: 60}}>
                <Icon iconUrl = {imageUrl}/>
            </div>
            <div className = 'templDetails'>
                <span>{templName}</span>
                <span>{abonentCode}</span>
            </div>
            <div className = 'templAmount'>
           
                {!editAmmount? <span onClick ={()=> {setEditAmmount(true); setNewAmmount(Math.abs(debt)) }}>{ formatNumber(debtAmmount) } ₾</span> :
               <input value = { debtAmmount } onChange = {(e)=> setNewAmmount(e.target.value)}  onBlur = {() => test(debtAmmount) } autoFocus = {true}/>}
            </div>
            
        </div>
        
    )
}

PayAllTemplate.propTypes = {

}

export default PayAllTemplate
