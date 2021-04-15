import React from 'react';
import './planCard.scss';
import PropTypes from "prop-types";
import Button from '../UI/Button/Button'

const PlanCard = (props) => {
    const getPlanColor =(planType) => {
        
        switch (planType) {
            case 1:
                return {class: 'PlanCard Wallet', imgUrl: '../../Assets/Images/LandingImg/mark-wallet.svg'}
            case 2:
                return {class: 'PlanCard Upera', imgUrl: '../../Assets/Images/LandingImg/mark-upera.svg'}
            case 3:
                return {class: 'PlanCard UniPlus', imgUrl: '../../Assets/Images/LandingImg/mark-plus.svg'}
            case 4:
                return {class: 'PlanCard UniUltra', imgUrl: '../../Assets/Images/LandingImg/mark-ultra.svg'}
            default:
                return {class: 'PlanCard Wallet', imgUrl: '../../Assets/Images/LandingImg/mark-wallet.svg'}
        }
        
    }
        const {paketTypeId, title, priceAnnual, currency, content } = props.card;
        console.log(props.card)


    return (
        <div className = {getPlanColor(paketTypeId).class}>
            <div className = 'PlanHeader'>  
                <div className = 'PlanTitle'>
                    <span>{title}</span>
                </div>
                <div className = 'PlanDetails'>
                    <span>{priceAnnual}</span>
                    <div className = 'PlanPayDetails'>
                        <span>{currency}</span>
                        <span>{props.payDuration}</span>
                    </div>
                </div>
            </div>      
                <div className ='PlanDescription'>
                    {content.map((content, index) => (
                        <span key={index}>
                            <img src={getPlanColor(paketTypeId).imgUrl} alt='checkmark'/>
                            <span>{content}</span>
                        </span>
                    ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button buttonClass='PlanButton'>გაიგე მეტი</Button>
                </div>
                    
        </div>
    );
};

PlanCard.propTypes= {


}
export default PlanCard;