import axios from 'axios'
class User {

    UserLogin = async (data) => {
        await axios.post('/User/Login', data, {
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            }
        });
    }

}

export default new User();
    