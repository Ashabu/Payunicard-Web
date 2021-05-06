import React, { Component } from 'react';
import './userRegistration.scss';
import Codes from '../../Services/Data/CountryCodes';
import Input from '../../Components/UI/Input/Input';
import Select from '../../Components/UI/Select/Select';
import Selectlist from '../../Components/HOC/SelectList/SelectLIst';
import Layout from '../Layout/Layout';
//import Validation from '../../Components/UI/InputValidation/Validation';
import User from '../../Services/API/UserServices';
import Button from '../../Components/UI/Button/Button';

class UserRegistration extends Component {

    state = {
        selected:{},
        mobileNumber: "+995558120936",
        username: '',
        surname: '',
        email: '',
        birthDate: '',
        personalNumber: '',
        password: '',
        repPassword: '',
        repPasswordError: '',
        isApplyTerms: 1,
        otp: null,
        

    }

    onRepeatePasswordCheck = () => {
        if(this.state.password !== '' &&  this.state.repPassword !== '' && this.state.repPassword !== this.state.password) {
            this.setState({repPasswordError: 'პაროლები არ ემთხვევა'})
        } else {
            this.setState({repPasswordError: ''})
        }
    }        

    
    handleUserRegistragion = async () => {
        debugger
        //if(this.state.repPasswordError !== "") return;
        const { mobileNumber, username, surname, email, birthDate, personalNumber, password, repPassword, isApplyTerms, otp } = this.state
        let regData = {
            userName: email,
            password: password,
            confirmPassword: repPassword,
            phone: mobileNumber,
            otpGuid: otp,
            isApplyTerms: isApplyTerms,
            name: username,
            surname: surname,
            birthDate: birthDate,
            personalId: personalNumber
        }
        User.UserRegistration(regData).then(res => {
            console.log(res.data)
        })
    }
    render() {
        let  repPasswordError = null;
        if(this.state.repPasswordError !== '') {
             repPasswordError =  (<span>{this.state.repPasswordError}</span>)
        } else  {
            repPasswordError = null;
        }
        

        return (
            <Layout>
                <div className = 'RegWrap'>
                    <div className = 'RegLeft'>
                        <div className = 'mobileNumber'>
                            <Select 
                            search
                                data={Codes.countryCodes} 
                                placeholder = 'Please Select'
                                selected = {this.state.selected.dial_code} 
                                render = {(element, setVisible) => (
                                <Selectlist  
                                    listClass = 'selectLIst' 
                                    key={element.name} 
                                    clicked={() => {this.setState({selected: element}); setVisible(false) }} >
                                       {element.dial_code} {element.name} 
                                </Selectlist>
                            )} />
                           
                            < Input className = 'Input Input-bg' type = 'text' placeholder ='მობილურის ნომერი' 
                                onInput = {(e)=> this.setState({mobileNumber: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'მობილურის ნომერი'}/>
                        </div>      
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'ელ-ფოსტა' 
                            onInput = {(e)=> this.setState({email: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'ელ-ფოსტა'}/>  
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'სახელი' 
                            onInput = {(e)=> this.setState({userName: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'სახელი'}/>
                        < Input className = 'Input Input-bg' type = 'text' placeholder ='გვარი ' 
                            onInput = {(e)=> this.setState({surname: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'გვარი'}/>    
                        < Input className = 'Input Input-bg' type = 'text' placeholder ='დაბადების თარიღი' 
                            onInput = {(e)=> this.setState({birthDate: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'დაბადების თარიღი'}/>    
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'პირადი ნომერი' 
                            onInput = {(e)=> this.setState({personalNumber: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'პირადი ნომერი'}/>
                        <div className = 'passwords'>   
                            < Input className = 'Input' type = 'text' placeholder ='პაროლი' 
                                onInput = {(e)=> this.setState({password: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'პაროლი'}/>
                            < Input className = 'Input'  type = 'text' placeholder ='გაიმეორეთ პაროლი' 
                                onInput = {(e)=> this.setState({repPassword: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'გაიმეორეთ პაროლი'}
                                onChange = {this.onRepeatePasswordCheck} />
                                {repPasswordError}
                        </div> 
                        < Input className = 'Input'  type = 'text'  
                                onInput = {(e)=> this.setState({otp: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                               />
                        <Button clicked = {this.handleUserRegistragion}>რეგისტრაცია</Button>               
                    </div>
                    <div>
                        <img src = '../../Assets/Images/LandingImg/login_img.svg' alt = 'login-img' />
                    </div>
                </div>
            </Layout>    
        );
    }
}

export default UserRegistration;