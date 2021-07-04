import React, {useState} from 'react';
import './accountCard.scss';
import PropTypes from 'prop-types'
import { formatNumber, setLogoByAccountType } from '../../Services/CommonFunctions';
import ClickableBulltes from '../HOC/ClickableBulltes';


const AccountCard = (props) => {
    const { accountName, accountNumber, accountTypeName, availableInEUR, availableInGBP, availableInGEL, availableInRUB, availableInTRY, availableInUSD , cards, currencies, imageUrl, type, mAskedCard , customerPaketId } = props.account;

    const [ availableBalance, setAvailableBalance ] = useState(availableInGEL);
    const [ balanceCcy, setBalanceCcy ] = useState('₾');
    

    const AccountCurrencies = () => {
        return (
            <div className = 'ac-currencies'>
                {currencies?.map((cur, index) => (
                    <span className = 'ac-currency' key = { index } onClick = {(event)=> changeAvailableBalance(event, cur.key)}>{ cur.value} { formatNumber(cur.balance) }</span>
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

    

    let BalanceCcy = null;
    if( type === 7) {
        BalanceCcy = (
            <img src = '../../Assets/Images/unipoint-star.svg' alt = 'start' />
        )
    };


    const changeAvailableBalance = (event, ccy) => {
        event.stopPropagation();
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
        props.detailView()
    }

    


    return (
        <div className = {'ac-container ' +  getAccountColorByType(customerPaketId)}>
           {cards?.length > 1?  <div className = 'multicard'>
                <div className = 'triangle'></div>
            </div> : null}
            <div className = 'ac-card' onClick = { clickCard }>
                {cards?.length > 0? <div className = 'triangle'></div> : null}
                <span className = 'ac-name'>{ accountTypeName } { mAskedCard }</span>
                <span className = 'ac-balance'> { formatNumber(availableBalance) } { BalanceCcy || balanceCcy }</span>
                {cards?.length > 1? <span className = 'ac-cardnumber'>{ cards.length }</span>: null }
                <img className = 'click-icon' src = '../../Assets/Images/three_dot.png' alt= 'copy-icon'/>
                {type !== 7 && <AccountCurrencies />} 
                <div className = 'ac-number' onClick = {props.onCopy}>
                    <span> { accountNumber }</span>
                    <img src = '../../Assets/Images/copy-icon.png' alt= 'copy-icon'/>
                </div>
                <img className = 'ac-logo' src = { setLogoByAccountType(type) } alt = 'logo' />            
            </div>
            <div className = 'ac-bullets'> 
                {cards?.length > 1? cards.map((c, i) => (
                    <ClickableBulltes key = { i } bullets = {c.current === false? 'ac-bullet' : 'ac-bullet active'} clicked = {() => props.onSwitch(i, props.account)}/>
                )): null }
            </div>
        </div>
    )
}

AccountCard.propTypes = {

}

export default AccountCard
