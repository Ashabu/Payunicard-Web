import React from 'react';
import './payment.scss';
import PropTypes from 'prop-types'

const  PaymentServices = (props) => {
    const {imageUrl, merchantServiceURL, name} = props.services;

    return (
        
        <div className = 'ServiceItem' onClick = {props.clicked}>
                <img src = {imageUrl || merchantServiceURL} alt = 'icon' />
            <div className = 'serviceName'>
                <p>{name}</p>
            </div>
        </div>
    )
}

PaymentServices.propTypes = {

}

export default PaymentServices
