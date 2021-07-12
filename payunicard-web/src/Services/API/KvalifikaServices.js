import axios from 'axios';

class KYC {
    StartKycSession = async () => {
        return await axios.get(`${globalConfig.api_URL}/Kyc/OpenSession`);
    }

    CloseKycSession = async (sessionId) => {
        return await axios.get(`${globalConfig.api_URL}/Kyc/CloseSession?SessionId=${sessionId}`);
    }

    GetKycData = async (sessionId) => {
        return await axios.get(`${globalConfig.api_URL}/Kyc/GetSessionData?Getlist=false`);
        //&SessionId=${sessionId}
    }

    KycSessionAttempts = async () => {
        return await axios.get(`${globalConfig.api_URL}/Kyc/GetUserKycSessionRemainingAttempts`);
    }

    ReProcessKycSession = async () => {
        return await axios.post(`${globalConfig.api_URL}/Kyc/ReProcessKycSession`);
    }

}

export default new KYC();