import React from 'react';
import './planCards.scss';
import PlanCard from '../PlanCard/PlanCard';

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
                <p>აირჩიეთ ტარიფი</p>
                <div className = 'PayDuration' onClick = {props.onPayMethod}>
                    <div className = {!props.priceAnnual?'PayOption Active' : 'PayOption'}>
                        <span>კვარტალი</span>
                    </div>
                    <div className = {props.priceAnnual?'PayOption Active' : 'PayOption'}>
                        <span>წელიწადი</span>
                    </div>
                </div>
                <span>დაზოგე 16%-მდე წლიურად გადახდისას</span>
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