import React from 'react';
import './sidePanel.scss';
import PropTypes from 'prop-types';


const  SidePanel = (props) => {
    
    const { stepBack, onStepBack, visible, headerText, closePanel, children, bredcrump } = props;
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
            <div>
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