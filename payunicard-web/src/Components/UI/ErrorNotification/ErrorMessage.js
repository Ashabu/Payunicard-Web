import React, {useState, useEffect, useRef}  from 'react';
import PropTypes from 'prop-types';



const ErrorMessage = (props) => {
    let mounted = false;
    const { message, onHandleError } = props;

    const [ errorClass, setErrorClass ] = useState('show');

    const showErrorTimeOut = useRef();
    const hideErrorTimeOut = useRef();

    useEffect(() => {
        mounted = true
        showErrorTimeOut.current = setTimeout(() => {
            setErrorClass('hide');
            hideErrorTimeOut.current = setTimeout(() => {
                onHandleError(message);
            }, 1000);
        }, 3000);
        if(mounted)
        return () => {
            {
                if (hideErrorTimeOut.current) clearTimeout(hideErrorTimeOut.current);
                if (showErrorTimeOut.current) clearTimeout(showErrorTimeOut.current);
            }
            mounted = false
        }
    },[message])
    
    return (

        <div className = { 'ErrorMessage ' + errorClass }>
            <img src = '../../../Assets/Images/alert_white.png' alt = 'icon' />
            <p>{ message }</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    
};

export default ErrorMessage;