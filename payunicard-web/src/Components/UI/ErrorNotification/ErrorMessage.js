import React, {useState, useEffect, useRef}  from 'react';
import PropTypes from 'prop-types';



const ErrorMessage = (props) => {
    let mounted = false;
    const { errorMessage, onHandleError } = props;

    const [ errorClass, setErrorClass ] = useState('show');

    const showErrorTimeOut = useRef();
    const hideErrorTimeOut = useRef();

    useEffect(() => {
        mounted = true
        showErrorTimeOut.current = setTimeout(() => {
            setErrorClass('hide');
            console.log('<===error component mounted ===>',showErrorTimeOut.current)
            hideErrorTimeOut.current = setTimeout(() => {
                onHandleError(errorMessage);
            }, 1000);
        }, 3000);
        if(mounted)
        return () => {
        
            console.log('<===error component unmounted ===>')
           
     {
        if (hideErrorTimeOut.current) clearTimeout(hideErrorTimeOut.current);
        if (showErrorTimeOut.current) clearTimeout(showErrorTimeOut.current);
        
     }
            mounted = false
        }
    },[errorMessage])
    
    return (

        <div className = { 'ErrorMessage ' + errorClass }>
            <img src = '../../../Assets/Images/alert_white.png' alt = 'icon' />
            <p>{ errorMessage }</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    
};

export default ErrorMessage;