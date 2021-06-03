import React, { useState } from 'react';
import './editTemplate.scss';
import PropTypes from 'prop-types';
import {Input, Button, Widget } from './../UI/UiComponents';

const EditTemplate = (props) => {
    const {} = props
    const [ eiditName, setEditName ] = useState(props.templateName);

    return (
        
        <Widget class = 'editTemplate'>
            <span>სახელის შეცვლა</span>
            <Input className = 'editInput' value = { eiditName } onChange = {(e) => setEditName(e.target.value)}/>
            <div style= {{display: 'flex', placeContent: 'center space-around', width: '100%'}}>
                <Button buttonClass = 'editButton green'>შენახვა</Button>
                <Button buttonClass = 'editButton gray' clicked = {props.close}>დახურვა</Button>
            </div>

        </Widget>
    )
}

EditTemplate.propTypes = {

}

export default EditTemplate
