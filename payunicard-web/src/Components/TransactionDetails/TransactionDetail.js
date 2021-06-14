import React, {Fragment} from 'react';
import './transactionDetail.scss';
import { formatCurrencySymbol, formatDate, formatNumber, setLogoByAccountType } from '../../Services/CommonFunctions';
import PropTypes from 'prop-types'

const  TransactionDetail =(props) => {

    const {tranDate, transactionDate, classCodeDescription, description, amount, imageUrl, accounttype, 
            ccy, shortDescription, merchantDescription, currency } = props.transaction;

    return (
        <div className = 'tran-detail-wrap' onClick = {props.clicked}>
            <div className = 'logo'>
                <img src = { setLogoByAccountType(accounttype) || '../../Assets/Images/lock-grey.png' } alt = 'logo' />
            </div>
            <div className = 'tran-details'>
                <span>{ formatDate(tranDate || transactionDate) }</span>
                <span>{classCodeDescription}</span>
                {props.showlong?
                <Fragment> 
                    <span className = 'forWeb'>{description || merchantDescription}</span>
                    <span className = 'forMobile'>{shortDescription || merchantDescription}</span>
                </Fragment> : <span>{shortDescription || merchantDescription}</span>}
            </div>
            <div className = 'tran-amount'>
                <span style ={{color: amount > 0? '#94dd34' : ccy? 'red' : 'grey'  }}>{ formatNumber(amount) }{ formatCurrencySymbol(ccy || currency) }</span>
            </div>
            <div className = 'more'>
                <img src = '../../Assets/Images/three_dot.png' alt = 'three-dots' />
            </div>
        </div>
    );
}


TransactionDetail.propTypes = {
    tranDate: PropTypes.string,
    transactionDate:PropTypes.string,
    classCodeDescription: PropTypes.string,
    description: PropTypes.string,
    shortDescription: PropTypes.string,
    amount:PropTypes.number,
    imageUrl:PropTypes.string,
    ccy: PropTypes.string,
    currency:PropTypes.string,
    merchantDescription:PropTypes.string,
    showlong: PropTypes.bool,

}

export default TransactionDetail;