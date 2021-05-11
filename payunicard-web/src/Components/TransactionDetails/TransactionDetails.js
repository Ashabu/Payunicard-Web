import React from 'react';
import './transactionDetails.scss';
import ComonFn from '../../Services/CommonFunctions';
import PropTypes from 'prop-types'

const  TransactionDetails =(props) => {

    const {tranDate, classCodeDescription, description, amount, imageUrl, ccy, } = props.transaction;

    return (
        <div className = 'tran-detail-wrap' onClick = {props.clicked}>
            <div className = 'logo'>
                <img src = {imageUrl} alt = 'logo' />
            </div>
            <div className = 'tran-details'>
                <span>{ComonFn.formatDate(tranDate)}</span>
                <span>{classCodeDescription}</span>
                <span>{description}</span>
            </div>
            <div className = 'tran-amount'>
                <span style ={{color: amount < 0? 'red' : '#94dd34'}}>{amount}{ComonFn.formatCurrencySymbol(ccy)}</span>
            </div>
            <div className = 'more'>
                <img src = '../../Assets/Images/three_dot.png' alt = 'three-dots' />
            </div>
        </div>
    );
}


PropTypes.TransactionDetails = {

}
export default TransactionDetails;