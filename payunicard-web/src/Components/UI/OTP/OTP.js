import React, {Fragment,useState} from 'react';
import './otp.scss';
import {Input, Backdrop, Button } from '../UiComponents';
import PropTypes from 'prop-types';
import OtpInput from './OtpInput';
import { Otp } from '../../../Services/API/APIS';

const OTP = (props) => {
    const { otpVisible, closeOtpWindow, getOtpValue, submitAction, errorText } = props;
    
    



    return (
        otpVisible? 
                <Fragment>
                <div className = 'Otp'>
                <div className = 'otp-header'>
                    <p>ერთჯერადი კოდი</p>
                    <span className = 'close-icon' onClick = { closeOtpWindow }>
                        <img src = '../../../Assets/Images/close-icon.svg'  alt = 'icon'/>
                    </span>
                </div>
                <div style = {{padding: 20}}>
                        <OtpInput callBack = { getOtpValue } otpError = { errorText }/>
                        {/* <span style = {{color: 'red'}}>{ errorText }</span> */}
                    <div className = 'otp-footer'>
                        <Button buttonClass = 'submit-button' clicked = { submitAction }>დადასტურება</Button>
                    </div>
                </div>
            </div>
            </Fragment>: null

    )
}

OTP.propTypes = {

}

export default OTP
