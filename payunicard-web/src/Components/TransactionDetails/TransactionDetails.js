import React from 'react';
import './transactionDetails.scss';
import ComonFn from '../../Services/CommonFunctions';
import PropTypes from 'prop-types'

const  TransactionDetails =(props) => {

    const {tranDate, classCodeDescription, description, amount, imageUrl, ccy, } = props.transaction;

    return (
        <div className = 'tran-detail-wrap' onClick = {props.clicked}>
            <div className = 'logo'>
                <img src = '../../Assets/Images/MccCodeImg/ჯანმრთელობა-და-თავის-მოვლა.png' alt = 'logo' />
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


TransactionDetails.propTypes = {
    tranDate: PropTypes.string,
    classCodeDescription: PropTypes.string,
    description: PropTypes.string,
    ccy: PropTypes.string,
    imageUrl: PropTypes.string,

}

export default TransactionDetails;