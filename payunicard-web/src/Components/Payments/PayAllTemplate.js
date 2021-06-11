import React from 'react';
import './payment.scss';
import PropTypes from 'prop-types';
import { Icon ,RoundCheckmark } from '../UI/UiComponents';
import CommonFn from '../../Services/CommonFunctions';


const  PayAllTemplate =(props) => {
    const { imageUrl, templName, abonentCode,  debt , payTempID, checked, toggle } = props.template;

    return (
        <div className = 'PayAllTemplate'>
            <div className = 'checkmark'>
                <RoundCheckmark checkType = 'checkbox' toggle = { toggle }  checked  = { checked } id = { payTempID } for = { payTempID }/>
            </div>
            <div className = 'templImg' style={{width: 60}}>
                <Icon iconUrl = {imageUrl}/>
            </div>
            <div className = 'templDetails'>
                <span>{templName}</span>
                <span>{abonentCode}</span>
            </div>
            <div className = 'templAmount'>
                <span>{CommonFn.formatNumber(Math.abs(debt))} ₾</span>
            </div>
            
        </div>
        
    )
}

PayAllTemplate.propTypes = {

}

export default PayAllTemplate
