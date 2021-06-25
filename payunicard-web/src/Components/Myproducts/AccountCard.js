import React, {useState} from 'react';
import './accountCard.scss';
import PropTypes from 'prop-types'
import { formatNumber, setLogoByAccountType } from '../../Services/CommonFunctions'

const AccountCard = (props) => {
    const { accountName, accountNumber, accountTypeName, availableInEUR, availableInGBP, availableInGEL, availableInRUB, availableInTRY, availableInUSD , cards, currencies, imageUrl, type, mAskedCard , customerPaketId } = props.account;

    console.log('account', props.account)
    const [ availableBalance, setAvailableBalance ] = useState(availableInGEL);
    const [ balanceCcy, setBalanceCcy ] = useState('₾');
    
    let AccountCurrencies = null;
    if(type !== 7) {
        AccountCurrencies = (
            <div className = 'ac-currencies'>
                {currencies?.map((cur, index) => (
                    <span className = 'ac-currency' key = { index } onClick = {()=> changeAvailableBalance(cur.key)}>{ cur.value} { formatNumber(cur.balance) }</span>
                ))}
            </div>
        )
    };

    let BalanceCcy = null;
    if( type === 7) {
        BalanceCcy = (
            <img src = '../../Assets/Images/unipoint-star.svg' alt = 'start' />
        )
    };


    const changeAvailableBalance = (ccy) => {
        let obj = {
            BalanceCcy: '',
            AvailableBalance: null
        }
        switch (ccy) {
            case "USD":
                obj.BalanceCcy = "$";
                obj.AvailableBalance = availableInUSD;
                break;
            case "EUR":
                obj.BalanceCcy = "€";
                obj.AvailableBalance = availableInEUR;
                break;
            case "GBP":
                obj.BalanceCcy = "£";
                obj.AvailableBalance = availableInGBP;
                break
            case "TRY":
                obj.BalanceCcy = "₺"
                obj.AvailableBalance = availableInTRY;    
                break;
            case "RUB":
                obj.BalanceCcy = "₽"
                obj.AvailableBalance = availableInRUB;
                break;
            case "GEL":
                obj.BalanceCcy = "₾"
                obj.AvailableBalance = availableInGEL;
                break    
            default: 
                obj.BalanceCcy = '₾'
                obj.AvailableBalance = availableInGEL;
                break;
        }
        setAvailableBalance(obj.AvailableBalance);
        setBalanceCcy(obj.BalanceCcy)
    };


    const clickCard = () => {
        console.log('clicked')
    }

    


    return (
        <div className = 'multicard'>
        <div className = 'AccountCard' onClick = { clickCard }>
            
            <span className = 'ac-name'>{ accountTypeName } { mAskedCard }</span>
            <span className = 'ac-balance'> { formatNumber(availableBalance) } { BalanceCcy || balanceCcy }</span>
            <img className = 'click-icon' src = '../../Assets/Images/three_dot.png' alt= 'copy-icon'/>
            { AccountCurrencies }
            <div className = 'ac-number'>
                <span> { accountNumber }</span>
                <img src = '../../Assets/Images/copy-icon.png' alt= 'copy-icon'/>
            </div>
            <img className = 'ac-logo' src = { setLogoByAccountType(type) } alt = 'logo' />            
        </div>
        </div>
    )
}

AccountCard.propTypes = {

}

export default AccountCard
