/* eslint-disable no-undef */
import axios from 'axios';

class Transaction {

    startPaymentTransaction = async (data) =>{
        return await axios.post(`${globalConfig.api_URL}/Transaction/registerpaytransaction`, data);
    }

    startPayBatchTransaction = async (data) => {
        let paydata =  {
            transactions: data
        }
        return await axios.post(`${globalConfig.api_URL}/Transaction/RegisterBatchPayTransaction`, paydata);
    }

    makeTransaction = async (type, data) => {
        if(type === 'ToBank') {
            return await axios.post(`${globalConfig.api_URL}/Transaction/MakeP2BTransaction`, data);
        } else {
            return await axios.post(`${globalConfig.api_URL}/Transaction/MakeP2PTransaction`, data);
        }

    }
    
    
    
}

export default new Transaction