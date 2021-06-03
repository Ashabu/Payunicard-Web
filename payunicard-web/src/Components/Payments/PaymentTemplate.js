import React, {Fragment, useEffect, useState} from 'react';
import './payment.scss';
import ComonFn from '../../Services/CommonFunctions';
import { Backdrop, RoundCheckmark } from './../UI/UiComponents';
import EditTemplate from './../EditTemlpate/EditTemplate';



const PaymentTemplate = (props) => {
    const { imageUrl, templName, abonentCode, payTempID, debt , checked } = props.template;

    const [ templateOptions, setTemplateOptions ] = useState(false);
    const [ editTemplateModal, setEditTemplateModal ] = useState(false)
    
    const editTemplateName = (id) => {

    }

    return(
        <div>
            <Backdrop show = {editTemplateModal} hide = {() => setEditTemplateModal(false)}/>
            {editTemplateModal? <EditTemplate templateName = { templName } close = {() => setEditTemplateModal(false)}/> : null}
        
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
                <RoundCheckmark checkType = 'checkbox' toggle = { props.toggle }  checked  = { checked } id = { payTempID } for = { payTempID }/>
                <span>{ComonFn.formatNumber(debt)} ₾</span>
                <img src = '../../Assets/Images/three_dot.png' alt = 'icon' onClick = {() => setTemplateOptions(!templateOptions)}/>
            </div>
            { templateOptions?
            <Fragment>
                <div className = 'templateOptions' tabIndex = '0' onBlur = {() => setTemplateOptions(false)}>
                    <div className = 'templateOption'  onClick = {() => setTemplateOptions(false)}>
                        შაბლონის წაშლა
                    </div>
                    <div className = 'templateOption'  onClick = {() => {setTemplateOptions(false); setEditTemplateModal(true)}}>
                        სახელის ცვლილება
                    </div>
                </div> 
            </Fragment> : null}
        </div>
        </div>
    )
}


export default PaymentTemplate;