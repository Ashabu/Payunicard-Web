import React from 'react';
import './planCard.scss';
import PropTypes from "prop-types";
import Button from '../../UI/Button/Button';
import Lang from '../../../Services/SetLang';
import GlobalContext from '../../../Contexsts/GlobalContext';

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
        const {paketTypeId, paketCode, priceAnnual, currency, content } = props.card;

    return (
        <div className = {getPlanColor(paketTypeId).class}>
            <div>
            <div className = 'PlanHeader'>  
                <div className = 'PlanTitle'>
                    <span>{paketCode}</span>
                </div>
                <div className = 'PlanDetails'>
                    <span>{priceAnnual}</span>
                    <div className = 'PlanPayDetails'>
                        <span>{currency}</span>
                        <span>{props.payDuration}</span>
                    </div>
                </div>
            </div>
                <GlobalContext.Consumer>{(context) => <div className ='PlanDescription'>
                    {content[context.lang].map((content, index) => (
                        <span key={index} style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                            <img style={{position: 'absolute', top: 3}}src={getPlanColor(paketTypeId).imgUrl} alt='checkmark'/>
                            <span className = 'desc-content'>{content}</span>
                        </span>
                    ))}
                    </div>}
                </GlobalContext.Consumer>
                </div>    
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button buttonClass='PlanButton'>{Lang.tr('ui.learnMore')}</Button>
                </div>
        </div>
    );
};

PlanCard.propTypes= {
    paketTypeId: PropTypes.number,
    paketCode: PropTypes.string,
    currency: PropTypes.string,
    payDuration: PropTypes.string,
    content: PropTypes.array,

}
export default PlanCard;