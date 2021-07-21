import React, { useState, useEffect } from 'react';
import './userRegistration.scss';
import Codes from '../../Services/Data/CountryCodes';

import Layout from '../Layout/Layout';
import User from '../../Services/API/UserServices';
import { Link } from 'react-router-dom';
import { Backdrop, Button, Flags, AppInput, InputValidation, PasswordComplexity, Select, SelectList } from '../../Components/UI/UiComponents';
import Lang from '../../Services/SetLang';


const UserRegistration = props => {
    
    const [ registrationData, setRegistrationData ] = useState({
        countryCode: '',
        mobileNumber: '',
        username: '',
        surname: '',
        email: '',
        birthDate: '',
        personalNumber: '',
        password: '',
        repeatePassword: '',
        isApplyTerms: 1,
        })

    const [ repeatePasswordError, setRepeatePasswordError ] = useState('');
    
    const [ oneTimePasscode, setOneTimePasscode ] = useState(null);
    
    const [ selected, setSelected ] = useState({});

    const onRepeatePasswordCheck = () => {
        if(rd.password !== '' &&  rd.repPassword !== '' && rd.repPassword !== rd.password) {
            setRepeatePasswordError('პაროლები არ ემთხვევა')
        } else {
            setRepeatePasswordError('')
        }
    }        


    useEffect(() => {

    },[ registrationData, repeatePasswordError, oneTimePasscode, selected ])


    const handleUserRegistragion = async () => {
        // if(!InputValidation.validate()) return
        //if(this.state.repPasswordError !== "") return;
        const { countryCode, mobileNumber, username, surname, email, birthDate, personalNumber, password, repeatePassword, isApplyTerms } = registrationData;
        let regData = {
            userName: email,
            password: password,
            confirmPassword: repeatePassword,
            phone: countryCode + mobileNumber,
            otpGuid: oneTimePasscode,
            isApplyTerms: isApplyTerms,
            name: username,
            surname: surname,
            birthDate: birthDate,
            personalId: personalNumber
        }
        User.UserRegistration(regData).then(res => {
        })
    }
       


        const rd = registrationData;

        return (
            <Layout>
                <div className = 'RegWrap'>
                    <div className = 'RegLeft'>
                        <div className = 'mobileNumber'>
                            
                            <Select 
                            search
                                data={ Codes.countryCodes } 
                                placeholder = 'Please Select'
                                selected = { selected.dial_code }
                                icon = {<Flags flagCode = { selected.flag_code } />} 
                                display ={(element, setVisible) => (
                                <SelectList 
                                    listClass = 'selectLIst' 
                                    key={ element.name } 
                                    clicked={() => { setRegistrationData(prevState => { return {...prevState, countryCode: element.dial_code} }); setSelected(element); setVisible(false) }} >
                                       <Flags flagCode = {element.flag_code}/> {element.dial_code} {element.name} 
                                </SelectList>
                            )} 
                            />
                           
                            < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder ='მობილურის ნომერი'
                                onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, mobileNumber: value }}) }} 
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'მობილურის ნომერი'}/>
                        </div>      
                        < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder = 'ელ-ფოსტა'  rule = {"email"}
                            onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, email: value }}) }} 
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'ელ-ფოსტა'}/>  
                        < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder = 'სახელი' rule = {'required'}
                            onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, userName: value }}) }} 
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'სახელი'}/>
                        < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder ='გვარი ' rule = {'required'}
                            onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, surname: value }}) }} 
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'გვარი'}/>    
                        < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder ='დაბადების თარიღი' 
                            onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, birthDate: value }}) }} 
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'დაბადების თარიღი'}/>    
                        < AppInput className = 'AppInput AppInput-bg' type = 'text' placeholder = 'პირადი ნომერი' rule = {'required'}
                            onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, personalNumber: value }}) }} 
                            onFocus = {(e) => e.target.placeholder = ""}
                            onBlur = {(e) => e.target.placeholder = 'პირადი ნომერი'}/>
                        <div className = 'passwords'>   
                            < AppInput className = 'AppInput' type = 'text' placeholder ='პაროლი' rule = {'required'}
                                onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, password: value }}) }} 
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'პაროლი'}/>
                            < AppInput className = 'AppInput'  type = 'text' placeholder ='გაიმეორეთ პაროლი' 
                                onInput = {(e) => { const value = e.target.value; setRegistrationData(prevState => {return {...prevState, repeatePassword: value }}) }} 
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'გაიმეორეთ პაროლი'}
                                onChange = { onRepeatePasswordCheck } />
                                { repeatePasswordError? <span>{ repeatePasswordError }</span> : null }
                        </div>
                                    <PasswordComplexity 
                                       regPassword = { rd.password } />
                        {/* < AppInput className = 'AppInput'  type = 'text'  
                                onInput = {(e)=> this.setState({otp: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                               /> */}
                        <div className = 'auth-buttons'>
                            <Button  clicked = { handleUserRegistragion }  buttonClass = 'button-sm green'> {Lang.tr('auth.signUp')} </Button>     
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

export default UserRegistration;