import React from 'react';
import './planCard.scss';
import PropTypes from "prop-types";
import Button from '../UI/Button/Button'

const PlanCard = (props) => {

    const getPlanColor =(planType) => {
        switch (planType) {
            case 1:
                return  'PlanCard Wallet'
            case 2:
                return  'PlanCard Upera'
            case 3:
                return 'PlanCard UniPlus'
            case 4:
                return  'PlanCard UniUltra'
            default:
                return'PlanCard Wallet'
        }
        
    }

    return (
        <div className = {getPlanColor(props.planTypeId)}>
            <div className = 'PlanHeader'>  
                <div className = 'PlanTitle'>
                    <span>{props.title}</span>
                </div>
                <div className = 'PlanDetails'>
                    <span>{props.price}</span>
                    <div className = 'PlanPayDetails'>
                        <span>{props.currency}</span>
                        <span>{props.payDuration}</span>
                    </div>
                </div>
            </div>      
                <div className ='PlanDescription'>
                    {props.content.map((content, index) => (
                        <span key={index}>
                            <img src='' alt='checkmark'/>
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