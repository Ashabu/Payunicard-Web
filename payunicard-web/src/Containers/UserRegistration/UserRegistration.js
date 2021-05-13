import React, { Component } from 'react';
import './userRegistration.scss';
import Codes from '../../Services/Data/CountryCodes';
import Input from '../../Components/UI/Input/Input';
import Select from '../../Components/UI/Select/Select';
import Selectlist from '../../Components/HOC/SelectList/SelectLIst';
import Layout from '../Layout/Layout';
import Validation from '../../Components/UI/InputValidation/Validation';
import User from '../../Services/API/UserServices';
import Button from '../../Components/UI/Button/Button';
import Flag from '../../Components/UI/CountryFlags/Flag';
import { Link } from 'react-router-dom';
import Lang from '../../Services/SetLang';
import PasswordComplexity from '../../Components/UI/PasswordComplexity/PasswordComplexity';


class UserRegistration extends Component {

    state = {
        selected:{},
        countryCode: "",
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
        hasBigLetter: false,
        hasSmallLetter: false,
        hasNumber: false,
        hasSpecialChar: false,

        

    }

    onRepeatePasswordCheck = () => {
        if(this.state.password !== '' &&  this.state.repPassword !== '' && this.state.repPassword !== this.state.password) {
            this.setState({repPasswordError: 'პაროლები არ ემთხვევა'})
        } else {
            this.setState({repPasswordError: ''})
        }
    }        

    handleUserRegistragion = async () => {
        if(!Validation.validate()) return
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
        console.log(this.state.password)
        let  repPasswordError = null;
        if(this.state.repPasswordError !== '') {
             repPasswordError =  (<span>{this.state.repPasswordError}</span>)
        } else  {
            repPasswordError = null;
        }
        
        console.log(this.state.selected)

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
                                icon = {<Flag flagCode = {this.state.selected.flag_code} />} 
                                render = {(element, setVisible) => (
                                <Selectlist  
                                    listClass = 'selectLIst' 
                                    key={element.name} 
                                    clicked={() => {this.setState({selected: element}); setVisible(false);}} >
                                       <Flag flagCode = {element.flag_code}/> {element.dial_code} {element.name} 
                                </Selectlist>
                            )} />
                           
                            < Input className = 'Input Input-bg' type = 'text' placeholder ='მობილურის ნომერი' 
                                onInput = {(e)=> this.setState({mobileNumber: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'მობილურის ნომერი'}/>
                        </div>      
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'ელ-ფოსტა'  rule = {"email"}
                            onInput = {(e)=> this.setState({email: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'ელ-ფოსტა'}/>  
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'სახელი' rule = {'required'}
                            onInput = {(e)=> this.setState({userName: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'სახელი'}/>
                        < Input className = 'Input Input-bg' type = 'text' placeholder ='გვარი ' rule = {'required'}
                            onInput = {(e)=> this.setState({surname: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'გვარი'}/>    
                        < Input className = 'Input Input-bg' type = 'text' placeholder ='დაბადების თარიღი' 
                            onInput = {(e)=> this.setState({birthDate: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'დაბადების თარიღი'}/>    
                        < Input className = 'Input Input-bg' type = 'text' placeholder = 'პირადი ნომერი' rule = {'required'}
                            onInput = {(e)=> this.setState({personalNumber: e.target.value})}
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'პირადი ნომერი'}/>
                        <div className = 'passwords'>   
                            < Input className = 'Input' type = 'text' placeholder ='პაროლი' rule = {'required'}
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
                                    <PasswordComplexity 
                                       regPassword = {this.state.password} />
                        {/* < Input className = 'Input'  type = 'text'  
                                onInput = {(e)=> this.setState({otp: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                               /> */}
                        <div className = 'auth-buttons'>
                            <Button  clicked = {this.handleUserRegistragion}  buttonClass = 'button-sm green'> {Lang.tr('auth.signUp')} </Button>     
                            <Link to = '/login' className = 'button-sm gray'>{Lang.tr('auth.signIn')}</Link>
                        </div>            
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