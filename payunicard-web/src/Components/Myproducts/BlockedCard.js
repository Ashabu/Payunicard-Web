import React, {useState} from 'react';
import './accountCard.scss';
import PropTypes from 'prop-types'
import { formatNumber, setLogoByAccountType } from '../../Services/CommonFunctions';
import ClickableBulltes from '../HOC/ClickableBulltes';


const ActiveCard = (props) => {
    const { accountName, accountNumber, accountTypeName, cards, currencies, type, customerPaketId } = props.account;
    const { maskedCardNumber } = props.card;


    const AccountCurrencies = () => {
        return (
            <div className = 'ac-currencies'>
                {currencies?.map((cur, index) => (
                    <span className = 'ac-currency' key = { index } >{ cur.value} 0.00</span>
                ))}
            </div>
        )
    }
    

    const getAccountColorByType  = (id) => {
        let accountClass = '';
        if(id === 2) {
            accountClass = 'Upera'
        } else if (id === 3) {
            accountClass = 'UniPlus'
        } else if (id === 4) {
            accountClass = 'UniUltra'
        } else {
            accountClass = 'Wallet'
        }

        return accountClass;
    }

    

  
    

    const clickCard = () => {
        console.log('clicked')  
    }

    


    return (
        <div className = {'ac-container ' +  getAccountColorByType(customerPaketId)}>
        
            <div className = 'ac-card' onClick = { clickCard }>
                {cards?.length > 0? <div className = 'triangle'></div> : null}
                <span className = 'ac-name'>{ accountTypeName } {  maskedCardNumber.slice(8, 16) }</span>
                <span className = 'ac-balance'> 0.00 ₾</span>
                <img className = 'blocked-icon' src = '../../Assets/Images/blocked-icon.png' alt = 'lock-icon' />
                    <AccountCurrencies /> 
                <div className = 'ac-number'>
                    <span> { accountNumber }</span>
                </div>
                <img className = 'ac-logo' src = { setLogoByAccountType(type) } alt = 'logo' />            
            </div>
        </div>
    )
}

ActiveCard.propTypes = {

}

export default ActiveCard
