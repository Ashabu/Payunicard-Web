import React from 'react';

const BankCard = (props) => {
    console.log(props.bankCard);
    const { cardNumber, cardType } = props.bankCard

    return (
        <div className = 'ac-bankCards'>
            <div className = 'cards-body'>
                <img src = {cardType} alt = 'logo' />
                <span>{cardNumber}</span>
            </div>
        </div>
    );
};

export default BankCard;