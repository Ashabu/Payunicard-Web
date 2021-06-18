import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Widget, Input } from '../UI/UiComponents';
import { formatNumber } from '../../Services/CommonFunctions';
import { Currency } from '../../Services/API/APIS';

const ConversionPanel = (props) => {
    const { usercurrency } = props;
    const rateTimeOut = useRef();


    const [ choosingFrom, setChoosingFrom ] = useState(false);
    const [ choosingTo, setChoosingTo ] = useState(false);
    const [ currencyFrom, setCurrencyFrom ] = useState({});
    const [ currencyTo, setCurrencyTo ] = useState({});
    const [ currencyRate, setCurrencyRate ] = useState(null);
    const [ amountFrom, setAmountFrom ] = useState('');
    const [ amountTo, setAmountTo ] = useState('');
    const [ fromBaseAmount, setFromBaseAmount ] = useState(true);
    const [ initialized, setInitialized ] = useState(null);
    
    useEffect(() => {
        if(fromBaseAmount === true && initialized === true) {
            testCalculator(amountFrom);
            return
        } else if(fromBaseAmount === false && initialized === true) {
            testCalculator(amountTo);
            return
        }
    }, [initialized])

    useEffect(() => {
        let tempCur = usercurrency?.filter(el => el.key === 'GEL' || el.key ==='USD');
        setCurrencyFrom(tempCur[0]);
        setCurrencyTo(tempCur[1]);
    }, [usercurrency])

    useEffect(() => {
        if(currencyFrom !== null && currencyTo !== null) {
            testCalculator();
        }

    },[currencyFrom, currencyFrom])
    const currencySwitch = () => {
        setCurrencyFrom(currencyTo);
        setCurrencyTo(currencyFrom);
    }


    const testCalculator = (amount) => {
        setInitialized(false)
        let CurrencyData = {
            ccy: currencyFrom.key,
            buyCcy: currencyTo.key,
            fromBaseAmount: fromBaseAmount,
            amountFROM: amount || 1
        }

        if(rateTimeOut.current) clearTimeout(rateTimeOut.current);
        rateTimeOut.current = setTimeout(() => {
            Currency.CurrencyRateCalculator(CurrencyData).then(res => {
                if(res.data.ok) {
                    
                    let realrate = res.data.data.realrate;
                    let ammount = res.data.data.amountTo;
                    setCurrencyRate(realrate);
                    if(amountFrom === '' && amountTo === '') {
                        setAmountFrom('');
                        setAmountTo();
                        return
                    }
                    if(fromBaseAmount){
                        setAmountTo(ammount.toFixed(2));
                    } else {
                        setAmountFrom(ammount.toFixed(2));
                    }
                    
                    
                }
                props.callBack(CurrencyData)
            })
        }, 1000);
        
    }
    
    
   




    let ChoosingOptionFrom = null;
    if(choosingFrom) {
        ChoosingOptionFrom = (
            <div className = 'cu-choosing from' >
                {usercurrency?.map(el => (
                    <div className = { currencyTo.value === el.value? 'currency disabled': 'currency' } 
                         key = { el.key } 
                         onClick = {() =>{setCurrencyFrom(el); setChoosingFrom(false)} }
                         >{el.key}</div>
                    ))}
            </div>
        )
    }

    let ChoosingOptionTo = null;
    if(choosingTo) {
        ChoosingOptionTo = (
            <div className = 'cu-choosing to' >
                {usercurrency?.map(el => (
                    <div className = { currencyFrom.value === el.value? 'currency disabled': 'currency' }  
                         key = { el.key } 
                         onClick = {() => {setCurrencyTo(el); setChoosingTo(false)} }
                         >{el.key}</div>
                    ))}
            </div>
        )
    }

    return (
        <div>
            <Widget>
                <div className = 'conversion' >
                    <div tabIndex = '1' onClick = {() => setChoosingFrom(!choosingFrom)} > {/*გასაწერია onBlur ფუნქცია*/}
                        <div className = 'co-option' >
                            <img src = '../../Assets/Images/arrow_down.png' alt = 'arrow'/>
                            <div className = 'cu-sign'>{currencyFrom.value}</div>
                            <span className = 'cu-from'>საიდან</span>
                        </div>
                    </div>
                    { ChoosingOptionFrom }
                    <div className = 'cu-switch' onClick ={currencySwitch}>&#5176;&#5171;</div>
                    <div tabIndex = '1' onClick = {() => setChoosingTo(!choosingTo)} > {/*გასაწერია onBlur ფუნქცია*/}
                        <div className = 'co-option' >
                            <span className = 'cu-from'>სად</span>
                            <div className = 'cu-sign'>{currencyTo.value}</div>
                            <img src = '../../Assets/Images/arrow_down.png' alt = 'arrow'/>
                        </div>
                    </div>
                    { ChoosingOptionTo }
                </div>
            </Widget>
            <div className = 'co-calculator'>
                <div className = 'co-amount-wrap'>
                    <div className = 'co-amount'>
                        <span>გასაყიდი</span>
                        <Input className = 'Input' value = { amountFrom } 
                            onChange = {(e) => setAmountFrom(e.target.value) }
                            onInput = {()=> {setFromBaseAmount(true); setInitialized(true)}}

                            placeholder = 'თანხა'/>
                    </div>
                    <div className = 'co-amount'>
                        <span>მისაღები</span>
                        <Input className = 'Input' value = { amountTo } 
                            onChange = {(e) => setAmountTo(e.target.value) } 
                            onInput = {()=> {setFromBaseAmount(false); setInitialized(true)}} 

                            placeholder = 'თანხა'/>
                    </div>
                </div>
                <span>ვალუტის კურსი: 1 {currencyTo.value}  = {currencyRate} {currencyFrom.value}</span>
            </div>    
        </div>    
    )
}

ConversionPanel.propTypes = {

}

export default ConversionPanel
