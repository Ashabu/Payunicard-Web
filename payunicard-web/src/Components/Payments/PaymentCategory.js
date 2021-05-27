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
            <p>{ name }</p>
        </div>
    )
}

PaymentCategory.propTypes = {

}

export default PaymentCategory;
