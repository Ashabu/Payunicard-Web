import React from 'react';
import './modal.scss';
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    return (
        <Backdrop show = {props.show}>
            <div className = 'Modal'>
                <div className = 'ModalHeader'>
                    {props.headerText}
                    <img src = '../../../Assets/Images/close-icon.svg' alt = 'close-icon' onClick = {() => props.onCloseModal()}/>

                </div>
                {props.children}
            </div>
        </Backdrop>    
    );
};

export default Modal;