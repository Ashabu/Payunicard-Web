/* eslint-disable no-undef */

import axios from 'axios'

class User {

    GetAccessToken = async () => {
        const GRANT_TYPE = 'password',
        SCOPE =  'Wallet_Api.Full',
        CLIENT_ID = 'WalletApi',
        CLIENT_SECRET = 'abcd123'

        let data = new FormData();
        data.append('grant_type', GRANT_TYPE);
        data.append('scope', SCOPE);
        data.append('client_id', CLIENT_ID);
        data.append('client_secret', CLIENT_SECRET);
        data.append('username', 'Avtandil@test.com');
        data.append( 'password', 'As123123!');

        return await axios.post(globalConfig.token_URL, data)
    }

    GetUserDetails = async () => {
        console.log(globalConfig)
        return await axios.get(`${globalConfig.api_URL}/User/GetUserDetails`);
        
    }

    CheckUser = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/CheckUser`, data);

    }
}

export default new User();
    