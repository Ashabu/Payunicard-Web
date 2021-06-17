import React, { Fragment, useState, useContext } from 'react';
import './transfer.scss';
import { Template } from '../../Services/API/APIS';

import PropTypes from 'prop-types'
import { Context } from '../../Context/AppContext';

const TransferTemplate = (props) => {
    const { state, setGlobalValue } = useContext(Context);
    const { transferTemplates } = state;

    const { templName,  templateId  } = props.template;

    const [ templateOptions, setTemplateOptions ] = useState(false);

    const deleteTemplate = () => {
        let deleteTemplateData = {
            templId: templateId,
        }

        Template.deleteTransferTemplate(deleteTemplateData).then(res => {
            let newTransferTemplates = transferTemplates.filter(t => t.templateId !== templateId);
            setGlobalValue({transferTemplates: newTransferTemplates})
        })
    }


    return (
        <div className = 'tr-template'>
            <div className = 't-body'>
                <div className = 't-photo' onClick = { props.clicked }>
                    <img src = '../../Assets/Images/user.png' alt = 'icon' />
                </div>
                <img style = {{cursor: 'pointer'}} onClick = {() => setTemplateOptions(true)} src = '../../Assets/Images/three_dot.png' alt = 'icon' />
            </div>
            <div className = 't-name'>
                <span>{ templName }</span>
            </div>
            { templateOptions?
            <Fragment>
                <div className = 't-options' tabIndex = '0' onBlur = {() => setTemplateOptions(false)}>
                    <div className = 't-option'  onClick = { () => {} }>
                    სახელის ცვლილება
                    </div>
                    <div className = 't-option'  onClick = { deleteTemplate }>
                        
                        შაბლონის წაშლა
                    </div>
                </div> 
            </Fragment> : null }
        </div>
        
            

    )
}

TransferTemplate.propTypes = {

}

export default TransferTemplate
