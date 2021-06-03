import React, {Fragment, useEffect, useState, useContext} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import ComonFn from '../../Services/CommonFunctions';
import { Backdrop, RoundCheckmark } from './../UI/UiComponents';
import { Template } from '../../Services/API/APIS';
import EditTemplate from './../EditTemlpate/EditTemplate';



const PaymentTemplate = (props) => {
    const { imageUrl, templName, abonentCode, payTempID, debt , checked } = props.template;

    const { state, setGlobalValue } = useContext(Context);
    const { paymentTemplates} = state;

    const [ templateOptions, setTemplateOptions ] = useState(false);
    const [ editTemplateModal, setEditTemplateModal ] = useState({
        visible: false,
        editTempl: false,
        deleteTempl: false
    });
    
    const editTemplateName = (newName) => {
        let editTemplateData = {
            payTempID: payTempID,
            templName: newName,
        }
        Template.editUtilityTemplate(editTemplateData).then(res => {
            if(res.data.ok) {
                setEditTemplateModal(false)
            }
          }).catch(error => {
              console.log(error)
          })
    }

    const deleteTemplate = () => {
        let deleteTemplateData = {
            payTempID: payTempID,
        }

        Template.deleteUtilityTemplate(deleteTemplateData).then(res => {
            console.log(res)
            let newPaymentTemplates = paymentTemplates.filter(t => t.payTempID !== payTempID);
            setGlobalValue({paymentTemplates: newPaymentTemplates})
        })
    }

    return(
        <div>
            <Backdrop show = {editTemplateModal.visible} hide = {() => setEditTemplateModal(prevState =>{ return {...prevState, visible: false} })}/>
            {editTemplateModal.visible? <EditTemplate nameEdit = {editTemplateModal.editTempl} templateName = { templName } close = {() => setEditTemplateModal(prevState =>{ return {...prevState, visible: false} })} confirmEdit = {editTemplateName} removeTemplate = {deleteTemplate}/> : null}
        
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
                    <div className = 'templateOption'  onClick = {() => {setTemplateOptions(false); setEditTemplateModal({visible: true, editTempl: false, deleteTempl: true})}}>
                        შაბლონის წაშლა
                    </div>
                    <div className = 'templateOption'  onClick = {() => {setTemplateOptions(false); setEditTemplateModal({visible: true, editTempl: true, deleteTempl: false})}}>
                        სახელის ცვლილება
                    </div>
                </div> 
            </Fragment> : null}
        </div>
        </div>
    )
}


export default PaymentTemplate;