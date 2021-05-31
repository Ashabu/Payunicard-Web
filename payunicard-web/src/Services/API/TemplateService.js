import axios from 'axios';

class Template {

    getUtilityTemplates = async () => {
        return await axios.get(`${globalConfig.api_URL}/Template/PayTemplateGet?IncludeDebt=true`);
    }
}

export default new Template