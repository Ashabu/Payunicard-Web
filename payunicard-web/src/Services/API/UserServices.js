/* eslint-disable no-undef */

import axios from 'axios'

class User {
    UserRegistration = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/UserPreRegistration`, data);
    }

    UserLogin = async (data) => {
        const GRANT_TYPE = 'password',
        SCOPE =  'Wallet_Api.Full',
        CLIENT_ID = 'WalletApi',
        CLIENT_SECRET = 'abcd123'

        let loginData = new FormData();
        loginData.append('grant_type', GRANT_TYPE);
        loginData.append('scope', SCOPE);
        loginData.append('client_id', CLIENT_ID);
        loginData.append('client_secret', CLIENT_SECRET);
        loginData.append('username', data.username);
        loginData.append( 'password', data.password);

        return await axios.post(globalConfig.token_URL, loginData)
    }

    CheckUser = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/CheckUser`, data);
    }

    GetPasswordResetData = async (data) => {
        return await axios.get(`${globalConfig.api_URL}/User/GetPasswordResetData`, data)
    }

    GetUserDetails = async () => {
        console.log(globalConfig)
        return await axios.get(`${globalConfig.api_URL}/User/GetUserDetails`);
    }

    GetUserAccountStatements = async (data = {}) => {
        return await axios.post(`${globalConfig.api_URL}/user/GetUserAccountsStatement`, data);
    }
    
    GetTransactionDetails = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/GetTransactionDetails`, data);
    }

    GetUserBlockedFunds = async (data = {}) => {
        return await axios.post(`${globalConfig.api_URL}/User/GetUserBlockedFunds`,data);
    }
    

   
}

export default new User();
    