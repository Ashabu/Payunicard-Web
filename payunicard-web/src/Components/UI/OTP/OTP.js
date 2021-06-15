import React, {useState} from 'react';
import './otp.scss';
import {Input, Button } from '../UiComponents';
import PropTypes from 'prop-types';
import OtpInput from './OtpInput';
import { Otp } from '../../../Services/API/APIS';

const OTP = (props) => {
    const {} = props
    
    const getOtpValue = (value) => {
        console.log('otp =>', value)
    }



    return (
            <div className = 'Otp'>
                <div className = 'otp-header'>
                    <p>ერთჯერადი კოდი</p>
                    <span className = 'close-icon'>
                        <img src = '../../../Assets/Images/close-icon.svg'  alt = 'icon'/>
                    </span>
                </div>
                <div style = {{padding: 20}}>
                        <OtpInput callBack = { getOtpValue }/>
                    <div className = 'otp-footer'>
                        <Button buttonClass = 'submit-button'>დადასტურება</Button>
                    </div>
                </div>
            </div>

    )
}

OTP.propTypes = {

}

export default OTP
