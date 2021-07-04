import axios from 'axios';

class Template {

    getUtilityTemplates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Template/PayTemplateGet?IncludeDebt=true`);
    }

    addUtilityTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/PayTemplateAdd`, data);
    }

    editUtilityTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/EditPayTemplate`, data);
    }

    deleteUtilityTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/PayTemplateDeActivate`, data);
    }

    getTransferTemplates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Template/GetTransactionTemplates`);
    }
    
    addTransferTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/AddTransactionTemplate`, data);
    }

    editTransferTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/TransactionTemplateEdit`, data);
    }

    deleteTransferTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/DeactivateUserTemplate`, data);
    }

}

export default new Template