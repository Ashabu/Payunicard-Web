import React, { useState, useEffect, useRef } from 'react';
import './errorNotification.scss';
import ErrorMesage from './ErrorMessage';
import PropTypes from 'prop-types';



const ErrorNotification = (props) => {
    const { errorMessages, onClearError } = props;
    const [ showError, setShowError ] = useState(true);
    
    
    
    const handleError = (error) => {
        onClearError(error);
        setShowError(false);
    }


    return (
         
            <div>
                { errorMessages.map((error, index) => (  <ErrorMesage key = { index } errorMessage = { error } onHandleError = { handleError }/>  ))} 
            </div>    
        

    )
}

export default ErrorNotification;


ErrorNotification.propTypes = {
    
};