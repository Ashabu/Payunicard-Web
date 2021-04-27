import React from 'react';
import './planCards.scss';
import PlanCard from '../PlanCard/PlanCard';
import Lang from '../../../Services/SetLang';

import PropTypes from 'prop-types';

const PlanCards = (props) => {

    let Card = props.plan;
    
        if(!props.priceAnnual) {
            
            Card = Card.filter(plan => plan.paketTypeId !==  2).map(card =>(
                <PlanCard
                    key =  {card.paketTypeId} 
                    payDuration = 'Year'
                    card = {card}/>
                ))    
        } else {
            Card = (Card.map(card => ( 
                <PlanCard
                    key = {card.paketTypeId} 
                    payDuration = 'Year'
                    card = {card} />
                )));
        }


    return (
        <div className = 'PlanCards'>
            <div className = 'PlanCards-Header'>
                <p>{Lang.tr('landing.choosePlan')}</p>
                <div className = 'PayDuration' onClick = {props.onPayMethod}>
                    <div className = {!props.priceAnnual?'PayOption Active' : 'PayOption'}>
                        <span>{Lang.tr('landing.quarter')}</span>
                    </div>
                    <div className = {props.priceAnnual?'PayOption Active' : 'PayOption'}>
                        <span>{Lang.tr('landing.year')}</span>
                    </div>
                </div>
                <span>{Lang.tr('landing.savePayment')}</span>
            </div>
            <div className = 'PlanCards-Body'>   
                {Card}
            </div>  
        </div>
    );
};

PlanCards.propTypes = {
    plan: PropTypes.array,
    onPayMethod: PropTypes.func,
    priceAnnual: PropTypes.bool,
};

export default PlanCards;