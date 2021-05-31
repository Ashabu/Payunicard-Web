import React, { useEffect } from 'react';
import './errorNotification.scss';
import ErrorMesage from './ErrorMessage';
import PropTypes from 'prop-types';



const ErrorNotification = (props) => {

    

    return (
       <div className = {props.errorMessages?.length? 'notifyError show' : 'notifyError'}>
            {props.errorMessages.map((error, index) =>(<ErrorMesage key = { index } errorMessage = { error } />))}
        </div>
    );
}

export default ErrorNotification;


ErrorNotification.propTypes = {
    
};