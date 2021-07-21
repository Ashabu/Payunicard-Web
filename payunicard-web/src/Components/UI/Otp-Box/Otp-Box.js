import React, { useState, useRef, useEffect } from 'react';
import './otpBox.scss';

const OtpBox = (props) => {

    const [otp, setOtp] = useState(new Array(props.count).fill(''));

    const input0 = useRef();
    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();

    const refs = [ input0, input1, input2, input3 ];

    const handleOnChange = (element, index) => {
        if (isNaN(element.value)) return;
        setOtp([...otp.map((v, i) => (i === index) ? element.value : v)]);
        if (element.nextSibling && element.value !== '') element.nextSibling.focus();
    }

    const handleFocusPrev = (event, index) => {
        if(event.key === 'Backspace' || event.key === 'End') {
            if (refs[index - 1] && otp[index] === '') {
                refs[index - 1].current?.focus();
            }
        }
    }

    console.log('OTP ---- >', otp)

    return (
        <div className='Otp-Box'>
            {otp.map((element, index) => (
                <input
                    key = {index}
                    className = 'otp-input'
                    ref = {refs[index]}
                    value = {element}
                    type = 'numeric'
                    maxLength = '1'
                    onChange = {e => handleOnChange(e.target, index)}
                    onKeyDown = {e => handleFocusPrev(e, index)}
                />))}
        </div>
    );
}

export default OtpBox;