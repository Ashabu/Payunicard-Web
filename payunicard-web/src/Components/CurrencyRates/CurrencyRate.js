import React from 'react'
import './currencyRate.scss';
import PropTypes from 'prop-types'

const CurrencyRate = (props) => {
    const { buyRate, ccy, diff, rate, sellRate } = props.Currency

    const getFlagByCurrencyType = (currency) => {
        if(currency === 'USD') {
            return '../../Assets/Images/icon-us.png';
        } else if (currency === 'EUR') {
            return '../../Assets/Images/icon-eu.png';
        } else if (currency === 'GBP') {
            return '../../Assets/Images/icon-gbp.png';
        } else {
            return ''
        }
    }

    return (
        <div className = 'currencyRate'>
            <div className = 'currency-img'>
                <img src = { getFlagByCurrencyType(ccy) } alt = 'flag' />
            </div>
            <div className = 'currency-state'>
                <span>
                    <span>{ rate.toFixed(4) }</span>
                    {diff < 0? 
                    <span style = {{color: '#94dd34'}}>{ Math.abs(diff) } <img src = '../../Assets/Images/currency-arrow-green.svg' alt = 'arrow'/></span> :
                    <span style = {{color: '#red'}}>{ Math.abs(diff) } <img src = '../../Assets/Images/currency-arrow-red.svg' alt = 'arrow'/></span>}
                    
                </span>
                <p>ოფიციალური</p>
            </div>
            <div className = 'buy'> 
                <p>{ buyRate.toFixed(4) }</p>
                <p>ყიდვა</p>
            </div>
            <div className = 'sell'>
                <p>{ sellRate.toFixed(4) }</p>
                <p>გაყიდვა</p>
            </div>
        </div>
        
    )
}

CurrencyRate.propTypes = {

}

export default CurrencyRate
