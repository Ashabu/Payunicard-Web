import React from 'react';
import './userProducts.scss';
import PropTypes from 'prop-types'

function UserProduct(props) {

    const {balance, imageURL, productName } = props.userproduct;

    return (
        <div className = 'userProduct'>
            <div className = 'icon'>
                <img src = {imageURL}  alt = 'icon'/>
            </div>
            <div className = 'productName'>
                <span>{productName}</span>
            </div>
            <div className = 'balance'>
                <span>{balance}</span>
            </div>
        </div>
    )
}

UserProduct.propTypes = {
    balance: PropTypes.number,
    imageURL: PropTypes.string,
    productName: PropTypes.string,
}

export default UserProduct;
