import React, {Fragment, useEffect, useState, useContext} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import ComonFn from '../../Services/CommonFunctions';
import { Backdrop, RoundCheckmark, Search } from './../UI/UiComponents';
import { Template } from '../../Services/API/APIS';
import EditTemplate from './../EditTemlpate/EditTemplate';



const PaymentTemplate = (props) => {
    const { imageUrl, templName, abonentCode, payTempID, debt , checked, toggle } = props.template;

    const { state, setGlobalValue } = useContext(Context);
    const { paymentTemplates} = state;

    const [ templateOptions, setTemplateOptions ] = useState(false);
    const [ editTemplateModal, setEditTemplateModal ] = useState({
        visible: false,
        editTempl: false,
        deleteTempl: false
    });
    

    const onEditTemplate = () => {
        setEditTemplateModal({visible: true, editTempl: true, deleteTempl: false});
        setTemplateOptions(false); 
    }

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

    const onDeleteTemplate = () => {
        setEditTemplateModal({visible: true, editTempl: false, deleteTempl: true});
        setTemplateOptions(false); 
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

    const onClosEditTemplateModal = () => {
        setEditTemplateModal(prevState =>{ return {...prevState, visible: false} })

    }

    return(
        <div>
            <Backdrop show = { editTemplateModal.visible } hide = { onClosEditTemplateModal }/>
            {editTemplateModal.visible? 
                <EditTemplate nameEdit = { editTemplateModal.editTempl } templateName = { templName } close = { onClosEditTemplateModal } confirmEdit = { editTemplateName } removeTemplate = { deleteTemplate }/> : null}
        
        <div className = 'PaymetnTemplate' onClick = {() => props.clicked(props.template) }>
            <div className = 'leftSide'>
                <div className = 'tempImage'>
                    <img src = { imageUrl } alt = 'icon' />
                </div>
                <div className = 'TemplateInfo'>
                    <span> { templName }</span>
                    <span>{ abonentCode }</span>
                </div>
            </div>
            
            <div className = 'rightSide'>
                <img src = '../../Assets/Images/unicard-logo-sm.png' alt = '' />
                <RoundCheckmark checkType = 'checkbox' toggle = { props.toggle }  checked  = { checked } id = { payTempID } for = { payTempID }/>
                <span>{ ComonFn.formatNumber(debt) } ₾</span>
                <img src = '../../Assets/Images/three_dot.png' alt = 'icon' onClick = {() => setTemplateOptions(!templateOptions)}/>
            </div>
            { templateOptions?
            <Fragment>
                <div className = 'templateOptions' tabIndex = '0' onBlur = {() => setTemplateOptions(false)}>
                    <div className = 'templateOption'  onClick = { onDeleteTemplate }>
                        შაბლონის წაშლა
                    </div>
                    <div className = 'templateOption'  onClick = { onEditTemplate }>
                        სახელის ცვლილება
                    </div>
                </div> 
            </Fragment> : null}
        </div>
        </div>
    )
}


export default PaymentTemplate;