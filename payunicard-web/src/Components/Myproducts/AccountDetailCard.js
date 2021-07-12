import React from 'react';
import { setLogoByAccountType } from '../../Services/CommonFunctions';
import ClickableBulltes from '../HOC/ClickableBulltes';
ClickableBulltes

const AccountDetailCard = (props) => {
    // const { 
    //     accountName, 
    //     accountNumber, 
    //     accountTypeName, 
    //     availableInEUR, 
    //     availableInGBP, 
    //     availableInGEL, 
    //     availableInRUB, 
    //     availableInTRY, 
    //     availableInUSD , 
    //     cards, 
    //     currencies, 
    //     imageUrl, 
    //     type, 
    //     mAskedCard, 
    //     customerPaketId } = props.account;

    

    return (
        <div className = 'accountDetails'>
            <span>{ props.account?.accountTypeName } { props.account?.mAskedCard }</span>
            <span>{ props.account?.availableInGEL } ₾</span>
            <div className = 'ac-currencies'>
                {props.account?.currencies?.map((cur, index) => (
                    <span className = 'ac-currency' key = { index } onClick = {() =>{}}>{ cur.value} { cur.balance }</span>
                ))}
            </div>
            <div className = 'ac-number' onClick = {props.onCopy}>
                    <span> { props.account?.accountNumber }</span>
                    <img src = '../../Assets/Images/copy-icon.png' alt= 'copy-icon'/>
                </div>
                <img className = 'ac-logo' src = { setLogoByAccountType(props.account?.type) } alt = 'logo' style ={{width: 40, height: 25}}/>
               {props.account?.cards.length > 1?  <div className = 'navigate'>
                    <img src = '../../Assets/Images/left-arrow-switch.svg' alt = 'arrow'/>
                    <div className = 'ac-bullets'> 
                    {props.account.cards.map((c, i) => (
                    <ClickableBulltes key = { i } bullets = {c.current === false? 'ac-bullet' : 'ac-bullet active'} clicked = {() => props.onSwitch(i, props.account)}/>
                ))}
                <img src = '../../Assets/Images/right-arrow-switch.svg' alt = 'arrow'/>
                </div>
                </div> : null}            
        </div>
    )
}

export default  AccountDetailCard;
