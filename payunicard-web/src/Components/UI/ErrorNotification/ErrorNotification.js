import React, { useState, useEffect, useRef } from 'react';
import './errorNotification.scss';
import ErrorMesage from './ErrorMessage';
import PropTypes from 'prop-types';



const ErrorNotification = (props) => {
    const { errorMessages, onClearError } = props;
    let ErrorArray = errorMessages;

    const errorRef = useRef();
    const hideErrorRef = useRef();


    const [ errorClassName, setErrorClassName ] = useState('notifyError hide');
    
    const onClearErrorMessage = () => {
        if(errorRef.current) clearTimeout(errorRef.current);

        hideError();
        errorRef.current = setTimeout(() => {
            onClearError();
        }, 3200);
    }

    const hideError = () => {
        if(hideErrorRef.current) clearTimeout(hideErrorRef.current);

        hideErrorRef.current = setTimeout(() => {
            setErrorClassName('notifyError hide');
        }, 3000);
    }

    useEffect(() => {
        if(errorMessages.length > 0){
        setErrorClassName('notifyError show')
        console.log(errorMessages)
            
            onClearErrorMessage();}

           
    }, [errorMessages])

    

    return (
         
        ErrorArray.map((error, index) => (
            <div key = { index } className = { errorClassName }>
                <ErrorMesage  errorMessage = { error } />
            </div>    
        ))

    )
}

export default ErrorNotification;


ErrorNotification.propTypes = {
    
};