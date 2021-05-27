/* eslint-disable no-undef */
import axios from 'axios'


class Presentation  {
    getPackageTypes = async () => {
        return await axios.get(`${globalConfig.api_URL}/GetPackageTypes`);
    }

    getPaymentServices = async (id) => {
        let params = id? {
            ParentID: id
        } : null
        return await axios.get(`${globalConfig.api_URL}/GetCategories`, {params});
    }

    getMetchantServices = async (id) => {
        return await axios.get(`${globalConfig.api_URL}/GetMerchantServices?CategoryID=${id}`);
    }

    getPaymentDetails = async (merchantCode, merchantServiceCode) => {
        return await axios.get(`${globalConfig.api_URL}/GetPaymentDetails?forMerchantCode=${merchantCode}&forMerchantServiceCode=${merchantServiceCode}&forOpClassCode=B2B.F`);
    }

    checkCostumerDebt = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Transaction/checkdept`, data);
    }

}



export default new Presentation();