/* eslint-disable no-useless-escape */
class Validation {
    validations = {
        phoneNumber: "^[0-9]{9,16}$",
        email: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=+\/\\#$%^&*~`}{\]\\[|()_+-])[A-Za-z\d#?!$()>`}{\]\\[|=+\/\\<%^&_,*-]{8,18}$/gm,
        hasBigLetter: /^(?=.*[A-Z])/g,
        hasSmallLetter: /^(?=.*[a-z])/g,
        hasNumber: /^(?=.*\d)/g,
        hasSpecialChar: /^(?=.*?[#?!$()>`}{\]\[|_=+/<%^&,*-])/g, // special char Regex exept . and @
        passwordLength: /^(?=.{8,})/g //password length Regex, min-length 8 char, max-length - unlimited

    }
    errorMessages = {
        email: 'wrong email address',
        required: "fill out the field"
    }

    inputs = [];
    errorStack = [];


    set Set(ref) {
        this.inputs.push(ref); 
    }
    
    validate = () => {
        this.inputs.forEach(el =>{
            let inp = el.current.childNodes[0];
            let errorSpan = el.current.childNodes[1];
            
            const rules = inp.getAttribute('rule')?.split(',') || [];
            
            rules.forEach(rule =>{
                this.errorStack = 0;
                if(rule === 'email') {
                    if(!this.validateEmail(inp.value)) {
                       errorSpan.innerHTML = this.errorMessages['email'];
                       this.errorStack.push(this.errorMessages['email'])
                       inp.setAttribute('style', 'border: 1px solid red')
                       return
                    } else {
                     errorSpan.innerHTML ='';
                     this.errorStack.pop()
                     inp.setAttribute('style', 'border: 1px solid green')
                    }
                 } else if(rule === 'required') {
                     if(!this.validateRequired(inp.value)) {
                        errorSpan.innerHTML = this.errorMessages['required'];
                        this.errorStack.push(this.errorMessages['required']);
                        inp.setAttribute('style', 'border: 1px solid red')
                        return
                     } else {
                      errorSpan.innerHTML ='';
                      this.errorStack.pop()
                      inp.setAttribute('style', 'border: 1px solid green')
                     }
                  }
            })
        })

        return this.errorStack <= 0;
    }

    validateEmail = (value ="") => {
        let reg = new RegExp(this.validations.email)
        return reg.test(value);
    }

    validateRequired = (value = "") => {
        return value && value.length > 0;
    }

    validateBigLetter = (value = "") => {
        let reg = new RegExp(this.validations.hasBigLetter);
        return reg.test(value);
    }

    validateSmallLetter = (value = "") => {
        let reg = new RegExp(this.validations.hasSmallLetter);
        return reg.test(value);    
    }

    validateNumber = (value = "") => {
        let reg = new RegExp(this.validations.hasNumber);
        return reg.test(value);
    }

    validateSpecialChar = (value = "") => {
        let reg = new RegExp(this.validations.hasSpecialChar);
        return reg.test(value);
    }

    validatePasswordLength = (value = "") => {
        let reg = new RegExp(this.validations.passwordLength);
        return reg.test(value);
    }

    validateFullPassword = (value = "") => {
        let reg = new RegExp(this.validations.regPassword);

        return reg.test(value)
    }

    removeValidateMe = (ref) => {
        this.inputs = this.inputs.filter(el => el !== ref);
        console.log(this.inputs)
    }
}

export default new Validation();