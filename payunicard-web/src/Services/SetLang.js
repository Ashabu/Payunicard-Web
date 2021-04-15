/* eslint-disable no-undef */
import axios from 'axios';

class Lang  {

setLang = async () => {
    return await axios.get(`http://localhost:9000/Assets/Language/geo.json`)
}

}


export default new Lang();