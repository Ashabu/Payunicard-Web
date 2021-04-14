/* eslint-disable no-useless-escape */
class Validation {
    validations = {
        phoneNumber: "^[0-9]{9,16}$",
        email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=+\/\\#$%^&*~`}{\]\\[|()_+-])[A-Za-z\d#?!$()>`}{\]\\[|=+\/\\<%^&_,*-]{8,18}$/gm
        

    }
    inputs = [];
    set Set(ref) {
        this.inputs.push(ref); 
    }
    
    validate = () => {
        this.inputs.forEach(el =>{
            console.log(el)
        })
    }
}

export default new Validation();