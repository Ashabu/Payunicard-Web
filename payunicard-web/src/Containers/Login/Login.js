/* eslint-disable no-undef */
import React, { useState, useEffect, useContext,  } from 'react';
import { useHistory } from "react-router";
import './login.scss';
import { Context } from '../../Context/AppContext';
import { Button, Input, Modal, InputValidation } from '../../Components/UI/UiComponents';
import Layout from '../Layout/Layout';
import Lang from '../../Services/SetLang';
import User from '../../Services/API/UserServices';
import AuthService from './../../Services/AuthService';

const  Login = () => {
    const { state, setGlobalValue } = useContext(Context);
    const { isUserAuthorized } = state;
    
    const history = useHistory();

    const [loginData, setLoginData] = useState({
        userName: "Avtandil@test.com",
        password: "As123123!"
    });

    const [ oneTimePasscode, setOneTimePasscode ] = useState("")

    const [forgotPasswordData, setForgotPasswordData] = useState({
        forgotPassword: false,
        userName: "",
        personalId: "",
        isRegistered: null,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [buttonLoading, setButtonLoading] = useState(false);

    const fpd = forgotPasswordData;
    const ld = loginData;

    useEffect(() => {

    },[ld.userName, ld.password, fpd.forgotPassword, fpd.isRegistered, fpd.personalId, fpd.userName])

useEffect(() => {
    if(!AuthService.isAuthenticated()) setGlobalValue({isUserAuthorized: false})
}, [])

    const login = () => {
       
        if(!InputValidation.validate('login')) {
            return;
        } 
        let Data = {
            username: loginData.userName,
            password: loginData.password,
            Otp: oneTimePasscode,
        }
       
        User.UserLogin(Data).then(res => {
            AuthService.setToken(res.data.access_token, res.data.refresh_token)
         
           setGlobalValue({ isUserAuthorized: true })
           history.push('/Dashboard');
       })
    }


    const handleModalClose = () => {
        setForgotPasswordData(prevState => {return {...prevState, forgotPassword: false, userName: ''}})
    }

    
        
    const handleCheckUser = async () => {
        if(!InputValidation.validate('resetPassword')) return;
        setButtonLoading(true)
        let cData = {
            UserName: forgotPasswordData.userName
        }
           User.CheckUser(cData).then(res => {
              
               if(res.data.ok) {
                   setButtonLoading(false)
                   setForgotPasswordData(prevState =>{return {...prevState, isRegistered: res.data.data.isRegistred}})
               } else {
                   if( res.data.errors.length > 0) {
                       setButtonLoading(false)
                       setErrorMessage(res.data.errors[0].displayText)
                   }
               }
        })
    }
    
    const handleGetPasswordResetData = async () => {
        if(!InputValidation.validate('resetPassword')) return;
         let resetData = {
            userName: forgotPasswordData.userName
        }

        if(forgotPasswordData.isRegistered) {
            resetData = {...resetData, personalId: forgotPasswordData.personalId}
        }

        User.GetPasswordResetData(resetData).then(res => {
            console.log(res.data)
        })
    }


    
       


        return (
            
            <Layout>
                <Modal show = {fpd.forgotPassword} headerText = 'დაგავიწყდათ პაროლი?' onCloseModal = {handleModalClose}>
                    <Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.username')} 
                        value = {fpd.userName}
                        onInput = {(e)=> {const value = e.target.value; setForgotPasswordData(prevState => {return {...prevState, userName: value }} )}}
                        onFocus = {() => setErrorMessage('')}
                        errormessage = {errorMessage}
                        rule ={'required'}
                        groupid = 'resetPassword'/>
                    { fpd.isRegistered? 
                    <Input  className = 'Input Input-bg' type = 'text' groupid = 'resetPassword' 
                        value = {fpd.personalId} 
                        onInput = {(e) => {const value = e.target.value; setForgotPasswordData(prevState =>{return {...prevState, personalId: value}})}}  
                        rule = {'required'} /> :null }
                     <div style={{display: 'flex'}}>
                    <Button  buttonClass = 'button-sm gray' clicked = {handleCheckUser} loading = {buttonLoading}> შემდეგი</Button>    
                    <Button  buttonClass = 'button-sm gray' clicked = {handleGetPasswordResetData} loading = {buttonLoading}> შემდეგი</Button>   
                    </div>    
                </Modal>
                <div className = 'LoginWrap'>
                    <div className='Login-leftSide'>
                        <div className = 'LoginHeader'>
                            <span>მოგესალმებით</span>
                        </div>
                        <div className = 'Login-inputs'>
                            <Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.username')} 
                                value = {ld.userName}
                                onInput = {(e)=> {const value = e.target.value; setLoginData(prevState => {return {...prevState, userName: value }})}}
                                onFocus = {(e) =>e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = Lang.tr('auth.username')}
                                rule = {"required"}
                                groupid = 'login'/>
                            <Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.password')}
                                value = {ld.password}
                                onInput = {(e)=> {const value = e.target.value; setLoginData(prevState => {return {...prevState, password: value }})}}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = Lang.tr('auth.password')}
                                rule = {'required'}
                                groupid = 'login'/>
                            <Input className = 'Input Input-med' type = 'numeric' value = {oneTimePasscode} onInput = {(e) => setOneTimePasscode(e.target.value)}/>        
                        </div>
                        <div className = 'LoginOptions'>
                            <label>
                                <input type = 'checkbox'/>
                                <span>მომხმარებლის დამახსოვრება</span>
                            </label>
                            <span onClick = {()=> setForgotPasswordData(prevState =>{return {...prevState, forgotPassword: false}})}>დაგავიწყდა პაროლი?</span>
                        </div>
                        <div className = 'LoginFooter'>
                            <Button  buttonClass = 'button-sm gray'> რეგისტრაცია</Button>
                            <Button  clicked = {login} buttonClass = 'button-sm green'>შესვლა</Button>
                        </div>
                    </div>
                    <div className = 'Login-rightSide'>
                        <img src = '../../Assets/Images/LandingImg/login_img.svg' alt = 'login-img' />
                    </div>      
                </div>
            </Layout>
        );
}

export default Login;