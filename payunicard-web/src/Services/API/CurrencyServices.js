/* eslint-disable no-undef */
import axios from 'axios';

class Currency {

    GetCurrencyRates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Currency/GetCurrencyRates`);
    }

}


export default new Currency