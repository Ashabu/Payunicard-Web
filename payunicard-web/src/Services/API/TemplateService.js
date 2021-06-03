import axios from 'axios';

class Template {

    getUtilityTemplates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Template/PayTemplateGet?IncludeDebt=true`);
    }

    editUtilityTemplate = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Template/EditPayTemplate`, data);
    }
}

export default new Template