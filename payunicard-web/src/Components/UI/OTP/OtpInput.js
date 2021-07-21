import React, { useState, useEffect } from 'react';
import './otp.scss';
import {AppInput, Button } from '../UiComponents';
import PropTypes from 'prop-types'

const OtpInput = (props) => {
    const {} = props
    const [ value, setValue ] = useState('');

    useEffect(() => {
        if(value.length === 4) {
            sendOtpValue();
        }
    }, [value])

    const sendOtpValue = () => {
        props.callBack(value);
    }

    
    return (
        <div className = 'otp-body'>
                <span>ჩაწერეთ მიღებული ერთჯერადი კოდი</span>
                <div className = 'otp-input'>
                    <AppInput value = { value } onChange = {(e) => setValue(e.target.value)} maxLength = { 4 } placeholder = 'ერთჯერადი კოდი'/>
                    <Button buttonClass = 'resend-button'>თავიდან გამოგზავნა</Button>
                </div>
                <span style = {{color: 'red'}}>{props.otpError} </span>
            </div>
    )
}

OtpInput.propTypes = {

}

export default OtpInput
