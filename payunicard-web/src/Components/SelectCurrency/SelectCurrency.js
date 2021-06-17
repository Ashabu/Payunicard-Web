import React, { useState, useContext, useEffect } from 'react';
import './selectCurrency.scss';
import { Context } from '../../Context/AppContext';
import { Select } from '../UI/UiComponents';
import PropTypes from 'prop-types';
import SelectedCurrency from '../HOC/SelectedCurrency/SelectedCurrency';



const SelectCurrency = (props) => {
    const { state } = useContext(Context);
    const { allUserCurrencies } = state;

    const { placeholder, current, choseDisabled } = props;

    const [ selectedCurrency, setSelectedCurrency] = useState(null);
    const [ userCurrencies, setUserCurrencies ] = useState([]);

    const setCurrency = (data) => {
        props.currency(data)
    }




    const currentCurrency = (key) => {
        let temCurrencies = userCurrencies;
        let currentCurrency = temCurrencies.filter(cur => cur.key == key);
        selectedCurrency(currentCurrency[0]);

    }

    useEffect(() => {
        setUserCurrencies(allUserCurrencies);
    }, [allUserCurrencies])

    useEffect(() => {
        if(current) {
            currentCurrency(current);
        }
    }, [current]); 

    useEffect(() => {
        if(choseDisabled) {
            let i = userCurrencies.findIndex(cur => acc.key === choseDisabled );
            userCurrencies.forEach(cur => cur.choseDisabled = false);
            userCurrencies[i].choseDisabled = true;
            setUserCurrencies([...userCurrencies]);
        }
        
    }, [choseDisabled])
  
    
    return (
        <Select
            
            data = { userCurrencies } 
            selected = { selectedCurrency? 
              
                <SelectedCurrency 
                    selected = { selectedCurrency } 
                     /> : <div style={{padding: 10}}>ვალუტა</div>  
                }
            display ={(element, setVisible) => (
                <SelectedCurrency 
                    key={ element.key } 
                    selected = { element } 
                    list
                    onDisabled = { element.choseDisabled }
                    clicked={() => { setSelectedCurrency(element); setCurrency(element); setVisible(false) }}/>
                )} 
            />
    )
}

SelectCurrency.propTypes = {

}   

export default SelectCurrency;
