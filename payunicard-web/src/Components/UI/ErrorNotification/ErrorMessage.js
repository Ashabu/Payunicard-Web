import React  from 'react';
import PropTypes from 'prop-types';



const ErrorMessage = (props) => {
    return (

        <div className = 'ErrorMessage'>
            <img src = '../../../Assets/Images/alert_white.png' alt = 'icon' />
            <p>{props.errorMessage}</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    
};

export default ErrorMessage;