import React from 'react'
import './currencyRate.scss';
import { Widget } from '../UI/UiComponents';
import PropTypes from 'prop-types'
import CurrencyRate from './CurrencyRate';

const CurrencyRates = (props) => {
    
    const currencyRates = props.currencyrates

    return (
        <Widget class = 'currency-widget'>
            <p>ვალუტეის კურსები</p>
            {currencyRates.map((currency, index) => (<CurrencyRate key = { index } Currency = { currency}/>))}
        </Widget>
        
    )
}

CurrencyRates.propTypes = {

}

export default CurrencyRates
