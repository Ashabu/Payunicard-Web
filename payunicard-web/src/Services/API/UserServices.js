/* eslint-disable no-undef */

import axios from 'axios'

class User {
    UserRegistration = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/UserPreRegistration`, data);
    }

    UserLogin = async (data) => {
        const GRANT_TYPE = 'password',
        SCOPE =  'Wallet_Api.Full offline_access',
        CLIENT_ID = 'WalletApi',
        CLIENT_SECRET = 'abcd123'

        let loginData = new FormData();
        loginData.append('grant_type',GRANT_TYPE);
        loginData.append('scope', SCOPE);
        loginData.append('client_id', CLIENT_ID);
        loginData.append('client_secret', CLIENT_SECRET);
        loginData.append('username', data.username);
        loginData.append( 'password', data.password);
        if(data.Otp)
        loginData.append('Otp', data.Otp );

        // let loginData = {
        //     grant_type: GRANT_TYPE,
        //     scope: SCOPE,
        //     client_id: CLIENT_ID,
        //     client_secret: CLIENT_SECRET,
        //     username: data.username,
        //     password: data.password,

        // }

        return await axios.post(globalConfig.token_URL, loginData)
    }

    CheckUser = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/CheckUser`, data);
    }

    GetPasswordResetData = async (data) => {
        return await axios.get(`${globalConfig.api_URL}/User/GetPasswordResetData`, data)
    }

    GetUserDetails = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetUserDetails`);
    }

    GetUserTotalBalance = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetUserTotalBalance`);
    }

    GetUserProducts = async () => {
        return await axios.get(`${globalConfig.api_URL}/user/GetUserProducts`);
    }

    GetUserAccountStatements = async (data = {}, params = {}) => {
        return await axios.post(`${globalConfig.api_URL}/user/GetUserAccountsStatement`, data, { params });
    }
    
    GetTransactionDetails = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/GetTransactionDetails`, data);
    }

    GetUserBlockedFunds = async (data = {}) => {
        return await axios.post(`${globalConfig.api_URL}/User/GetUserBlockedFunds`,data);
    }

    GetUserAccounts = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetAccountBalanceByccy`);
    }

    GetUnicards = async () =>  {
        return await axios.get(`${globalConfig.api_URL}/Card/GetUnicards`);
    }

    GetUserBankCards = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetUserBankCards`);
    }

    GetCustomerEmploymentStatusTypes = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetCustomerEmploymentStatusTypes`);
    }
    

    GetCustomerWorkTypes = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetCustomerWorkTypes`);
    }

    GetCustomerExpectedTurnoverTypes = async () => {
        return await axios.get(`${globalConfig.api_URL}/User/GetCustomerExpectedTurnoverTypes`);
    }
    
    GetCountryList = async () => {
        return await axios.get(`${globalConfig.api_URL}/GetCitizenshipCountries`);
    }

    GetCityList = async () => {
        return await axios.get(`${globalConfig.api_URL}/GetCities`);
    }

    FinishCostumerRegistration = async(data) => {
        return await axios.post(`${globalConfig.api_URL}/User/FinishCustomerRegistration`, data);
    }

    
}

export default new User();
    