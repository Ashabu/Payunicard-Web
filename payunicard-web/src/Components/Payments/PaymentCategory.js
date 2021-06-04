import React from 'react';
import './payment.scss';
import PropTypes from 'prop-types'


const  PaymentCategory = (props) =>{
    const {imageUrl, name } = props.services

    return (
        <div className = 'CategoryItem' onClick = {props.clicked}>
            <div className = 'serviceImg'>
                <img src = { imageUrl } alt = 'icon'/>
            </div>
            <span>{ name }</span>
        </div>
    )
}

PaymentCategory.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string
}

export default PaymentCategory;
