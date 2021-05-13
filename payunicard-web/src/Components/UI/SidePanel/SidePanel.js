import React from 'react';
import './sidePanel.scss';
import PropTypes from 'prop-types';


const  SidePanel = (props) => {
    const {stepBack, visible, headerText, closePanel, children} = props;
    let StepBack = null;

    if(stepBack) {
        StepBack = (<img src = '../../../Assets/Images/step-back.png' alt = 'icon' />)
    }

    return (
        <div className = {visible? 'sidePanel active' : 'sidePanel'}>
            <div className = 'header'>
                <div>
                    {StepBack}
                </div>
                <div>
                    <p>{headerText}</p>
                </div>
                <div className = 'close-sidePanel' onClick = {closePanel}>
                    <img src = '../../../Assets/Images/close-icon.svg' alt = 'icon' />
                </div>
            </div>
            <div>
                {children}
            </div>
            
        </div>
    );
}

SidePanel.propTypes = {
    stepBack: PropTypes.bool,
    visible: PropTypes.bool,
    closePanel: PropTypes.func,
    headerText: PropTypes.string,
};


export default SidePanel;