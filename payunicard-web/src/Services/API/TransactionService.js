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
        const P2BTrasnaction = await axios.post(`${globalConfig.api_URL}/Transaction/MakeP2BTransaction`, data);
        const P2PTransaction = await axios.post(`${globalConfig.api_URL}/Transaction/MakeP2PTransaction`, data);

        if(type === 'ToBank') {
            return P2BTrasnaction;
        } else {
            return P2PTransaction;
        }

    }
    
    
}

export default new Transaction