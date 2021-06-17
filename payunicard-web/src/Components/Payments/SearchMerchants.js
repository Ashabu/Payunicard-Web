import React from 'react';
import './payment.scss';
import PropTypes from 'prop-types'


const  SearchMerchants = (props) =>{
    const {merchantServiceURL, resourceValue } = props.merchants;
    return (
        <div className = 'CategoryItem' onClick = {props.clicked}>
            <div className = 'serviceImg'>
                <img src = { merchantServiceURL } alt = 'icon'/>
            </div>
            <span>{ resourceValue }</span>
        </div>
    )
}

SearchMerchants.propTypes = {
    merchantServiceURL: PropTypes.string,
    resourceValue: PropTypes.string
}

export default SearchMerchants;
