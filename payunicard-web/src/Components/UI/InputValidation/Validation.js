/* eslint-disable no-useless-escape */
class Validation {
    validations = {
        phoneNumber: "^[0-9]{9,16}$",
        email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=+\/\\#$%^&*~`}{\]\\[|()_+-])[A-Za-z\d#?!$()>`}{\]\\[|=+\/\\<%^&_,*-]{8,18}$/gm
        

    }
    errorMessages = {
        email: 'wrong email address',
        required: "fill out the field"
    }
    inputs = [];
    set Set(ref) {
        this.inputs.push(ref); 
    }
    
    validate = () => {
        this.inputs.forEach(el =>{
            let inp = el.current.childNodes[0];
            let errorSpan = el.current.childNodes[1];
            debugger
            console.log(el.current.childNodes)
            const rule = inp.getAttribute('rule')?.split(',') || [];


            if(rule === 'email') {
               if(!this.validateEmail(inp.value)) {
                  errorSpan.innerHTML = this.errorMessages['email']
               } else {
                errorSpan.innerHTML ='';
                inp.setAttribute('style', 'border: 1px solid green')
               }
            } else if(rule === 'required') {
                if(!this.validateRequired(inp.value)) {
                   errorSpan.innerHTML = this.errorMessages['required']
                } else {
                 errorSpan.innerHTML ='';
                 inp.setAttribute('style', 'border: 1px solid green')
                }
             }

        })
    }

    validateEmail = (value ="") => {
        let reg = new RegExp(this.validations.email)
        return reg.test(value);
    }

    validateRequired = (value = "") => {
        return value && value.length > 0;
    }

    removeValidateMe = (ref) => {
        this.inputs = this.inputs.filter(el => el !== ref);
        console.log(this.inputs)
    }
}

export default new Validation();