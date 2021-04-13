class Validation {
    asdasd = {

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