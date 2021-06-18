/* eslint-disable no-undef */
import axios from 'axios';

class Currency {

    GetCurrencyRates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Currency/GetCurrencyRates`);
    }

    CurrencyRateCalculator = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Currency/CurrencyConverterCalculatror`, data);
    }


    
}


export default new Currency