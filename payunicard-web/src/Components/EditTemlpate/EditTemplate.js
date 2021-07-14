import React, { useState } from 'react';
import './editTemplate.scss';
import PropTypes from 'prop-types';
import {AppInput, Button, Widget } from './../UI/UiComponents';

const EditTemplate = (props) => {
    const { nameEdit, confirmEdit, close, removeTemplate } = props
    const [ eiditName, setEditName ] = useState(props.templateName);

    return (
        
        <Widget class = 'editTemplate'>
           <span> {nameEdit?'სახელის შეცვლა' : 'შაბლონის წაშლა'}</span>
            {nameEdit? <AppInput className = 'editInput' value = { eiditName } onChange = {(e) => setEditName(e.target.value)}/> : null}
            <div style= {{display: 'flex', placeContent: 'center space-between', width: '100%'}}>
               {nameEdit? 
                <Button buttonClass = 'editButton green' clicked = {() => confirmEdit(eiditName) }>შენახვა</Button> : 
                <Button buttonClass = 'editButton danger' clicked = {removeTemplate}>წაშლა</Button>}
                <Button buttonClass = 'editButton gray' clicked = { close }>დახურვა</Button>
            </div>

        </Widget>
    )
}

EditTemplate.propTypes = {

}

export default EditTemplate
