import React, {Fragment, useEffect, useState} from 'react';
import './payment.scss';
import ComonFn from '../../Services/CommonFunctions';
import { RoundCheckmark } from './../UI/UiComponents';



const PaymentTemplate = (props) => {
    const { imageUrl, templName, abonentCode, payTempID, debt , checked } = props.template;

    const [ templateOptions, setTemplateOptions ] = useState(false);
    // const [ inputChecked, setInputChecked ] = useState(false);


    const cc = (e, templ) => {
 
        
    }

   
    return(
        <div className = 'PaymetnTemplate'>
            <div className = 'leftSide'>
                <div className = 'tempImage'>
                    <img src = {imageUrl} alt = 'icon' />
                </div>
                <div className = 'TemplateInfo'>
                    <span> {templName}</span>
                    <span>{abonentCode}</span>
                </div>
            </div>
            
            <div className = 'rightSide'>
                <img src = '../../Assets/Images/unicard-logo-sm.png' alt = '' />
                <RoundCheckmark checkType = 'checkbox' toggle = {props.toggle}  checked  = { checked } id = {payTempID} for = {payTempID}/>
                <span>{ComonFn.formatNumber(debt)} ₾</span>
                <img src = '../../Assets/Images/three_dot.png' alt = 'icon' onClick = {() => setTemplateOptions(!templateOptions)}/>
            </div>
            { templateOptions?
            <Fragment>
                <div className = 'templateOptions' tabIndex = '0' onBlur = {() => setTemplateOptions(false)}>
                    <div className = 'templateOption'  onClick = {() => setTemplateOptions(false)}>
                        შაბლონის წაშლა
                    </div>
                    <div className = 'templateOption'  onClick = {() => setTemplateOptions(false)}>
                        სახელის ცვლილება
                    </div>
                </div> 
            </Fragment> : null}
        </div>
    )
}


export default PaymentTemplate;