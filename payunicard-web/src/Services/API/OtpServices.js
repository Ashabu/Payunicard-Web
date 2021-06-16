import axios from 'axios';

class Otp {

    UnicardOtp = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/Transaction/SendUnicardOtp`, data);
    }
    
    PhoneOtp = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/OTP/SendPhoneOTP`, data);
    }

    SubmitPhoneOtp = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/OTP/SubmitPhoneOtp`, data);
    }

    PhoneOtpByUser = async (data) => {
        return await axios.post(`${globalConfig.api_URL}/User/GeneratePhoneOtpByUser`, data);
    }

}


export default new Otp;
