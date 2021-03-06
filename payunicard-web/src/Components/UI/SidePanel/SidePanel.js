import React from 'react';
import './sidePanel.scss';
import PropTypes from 'prop-types';
import ErrorNotification from './../ErrorNotification/ErrorNotification';


const  SidePanel = (props) => {
    
    const { errorContainer, stepBack, onStepBack, visible, headerText, closePanel, children, bredcrump, errorMessage, onClearError } = props;
    let StepBack = null;

    if(stepBack) {
        StepBack = (<img src = '../../../Assets/Images/step-back.png' alt = 'icon' onClick = { onStepBack } />)
    }

    let bredCrump = null;

    if(bredcrump?.length > 0) {
        bredCrump = bredcrump.map((item, index) => (<span style = {{cursor: 'pointer', textTransform: 'capitalize'}} key = { index } onClick = {() => props.bredClick(index)}>{ index === 0 ? item : ' > ' + item }</span>))
    }  else {
        
    }

    return (
        <div className = { visible? 'sidePanel active' : 'sidePanel' }>
            <ErrorNotification errorMessage = { errorMessage } handleClearError = { onClearError }/>
            <div className = 'header'>
                
                <div>
                    { StepBack }
                </div>
                <div>
                    <p>{ headerText }</p>
                    { bredCrump }
                </div>
                <div className = 'close-sidePanel' onClick = { closePanel }>
                    <img src = '../../../Assets/Images/close-icon.svg' alt = 'icon' />
                </div>
            </div>
            <div className = 'body'>
                { children }
            </div>
            
        </div>
    );
}

SidePanel.propTypes = {
    stepBack: PropTypes.bool,
    visible: PropTypes.bool,
    closePanel: PropTypes.func,
    breadcrump: PropTypes.array,
    headerText: PropTypes.string,
};


export default SidePanel;