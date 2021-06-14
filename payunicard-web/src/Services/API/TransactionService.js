/* eslint-disable no-undef */
import axios from 'axios';

class Transaction {

    startPaymentTransaction = async (data) =>{
        return await axios.post(`${globalConfig.api_URL}/Transaction/registerpaytransaction`, data);
    }

    startPayBatchTransaction = async (data) => {
        let paydata =  {
            transaction: data
        }
        return await axios.post(`${globalConfig.api_URL}/Transaction/RegisterBatchPayTransaction`, paydata);
    }
}

export default new Transaction