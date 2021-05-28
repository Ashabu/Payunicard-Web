/* eslint-disable no-undef */
import axios from 'axios';

class Transaction {

    startPaymentTransaction = async (data) =>{
        return await axios.post(`${globalConfig.api_URL}/Transaction/registerpaytransaction`, data);
    }

}

export default new Transaction