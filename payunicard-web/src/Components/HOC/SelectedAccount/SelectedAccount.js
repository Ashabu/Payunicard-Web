import React, { Fragment } from 'react';
import './selectedAccounts.scss';
import { formatNumber, setLogoByAccountType } from '../../../Services/CommonFunctions';
import Icon from './../../UI/Icon/Icon';

const SelectedAccount = props => {
    const { icon, selected, orderCard, list } = props;
    const { accountNumber, accountTypeName, availableInGEL, currencies, mAskedCard, type } = selected;

    let UserCurrencies = (
        <div className = 'currencies'>
            {currencies?.map((cur, index) => (<span key = { index }>{cur.value}{formatNumber(cur.balance)}</span>))}
            </div>
    );
    let BalanceCurrency = '₾';
    
    
    if(type === 7) {
        UserCurrencies = <div className = 'currencies'>
                {currencies?.map((cur, index) => (<span key = { index }>{'≈ ' + formatNumber(cur.balance) + ' ₾'}</span>))}
            </div>
        BalanceCurrency = <img src = '../../../Assets/Images/unipoint-star.svg' alt = 'icon'/>      
    } 


    
    
return (
        <div className = {list? 'selectedAccount list ' : 'selectedAccount'} onClick = {list? props.clicked : () =>{}}>
            <div className = 'accountWrap'>
                   
                {icon? <div style = {{width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon iconUrl = { setLogoByAccountType(type) }/></div> : null}
                <div className = 'account'>
                    { accountNumber }{orderCard? '****' + accountTypeName : mAskedCard }
                    {UserCurrencies}
                </div> 
            </div>     
            <div className = 'balance'>
                {formatNumber(availableInGEL)} {BalanceCurrency}
            </div>
        </div>
    )
}

export default SelectedAccount;