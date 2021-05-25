/* eslint-disable no-undef */
import axios from 'axios';

class UploadImage {

    UploadImage = async (data) => {
        return axios.post(`${globalConfig.api_URL}/Files/UploadImage`, data);
    }
}

export default new UploadImage;