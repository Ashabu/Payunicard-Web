import axios from 'axios'


class Presentation  {
    getPackageTypes = async () => {
        // eslint-disable-next-line no-undef
        return await axios.get(`${globalConfig.api_URL}/GetPackageTypes`)
    }



}



export default new Presentation();