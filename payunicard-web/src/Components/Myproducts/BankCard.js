import React from 'react';

const BankCard = (props) => {
    const { cardNumber, cardType } = props.bankCard;

    const getLogoByCardType = (type) => {
        if(type === 5) {
            return '../../../Assets/Images/mc-logo-sm.png';
        } else if (type === 4) {
            return '../../../Assets/Images/visa-logo_sm.png';
        } else {
            return undefined;
        } 
    }; 


    return (
        <div className = 'ac-bankCards'>
            <div className = 'cards-body'>
                <img src = { getLogoByCardType(cardType) } alt = 'logo' />
                <span>{ cardNumber }</span>
            </div>
        </div>
    );
};

export default BankCard;