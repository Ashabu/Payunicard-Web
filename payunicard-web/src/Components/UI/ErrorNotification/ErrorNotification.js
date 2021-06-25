import React, { useState, useEffect, useRef } from 'react';
import './errorNotification.scss';
import ErrorMesage from './ErrorMessage';
import PropTypes from 'prop-types';



const ErrorNotification = (props) => {
    const { errorMessage, handleClearError } = props;
    const [ showError, setShowError ] = useState(true);
    
    
    
    const handleError = (error) => {
        handleClearError(error);
        setShowError(false);
    }


    return (
         
            <div>
                { errorMessage?.map((error, index) => (  <ErrorMesage key = { index } message = { error } onHandleError = { handleError }/>  ))} 
            </div>    
        

    )
}

export default ErrorNotification;


ErrorNotification.propTypes = {
    
};