import axios from 'axios';

class KYC {
    StartKycSession = async () => {
        return await axios.get(`${globalConfig.api_URL}/Kyc/OpenSession`);
    }

    CloseKycSession = async () => {
        
    }

}

export default new KYC();