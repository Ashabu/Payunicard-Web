import axios from 'axios'


class Presentation  {
    getPackageTypes = async () => {
        // eslint-disable-next-line no-undef
        await axios.get(`${globalConfig.api_URL}Prezentation/GetPackageTypes`)
    }



}



export default new Presentation();