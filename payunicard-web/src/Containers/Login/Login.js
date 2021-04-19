/* eslint-disable no-undef */
import React, { Component } from 'react';
import axios from 'axios';
import './login.scss';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Layout from '../Layout/Layout';
import Validation from '../../Components/UI/InputValidation/Validation';
// import Route from 'react-router'
import Lang from '../../Services/SetLang';
import User from '../../Services/API/UserServices';
import Modal from '../../Components/UI/Modal/Modal';

class Login extends Component {

    state = {
        userName: "",
        password: "",
        forgotPassword: false
    }

    login = () => {
       User.GetAccessToken().then(res => {
           let token=res.data.access_token;
           localStorage.setItem('token',token);
           this.props.history.push('/Dashboard')


       })
    }


    handleModalClose = () => {
        this.setState({forgotPassword: false, userName: ''})
    }

        // alert();
    
        
    handleCheckUser = async () => {
        let cData = new FormData();
        cData.append('UserName' , this.state.userName);

           User.CheckUser(cData).then(res => {
            
            console.log('check user =>', res)
        })
    }     


    render() {
        // Validation.validate();
        return (
            
            <Layout>
                <Modal show = {this.state.forgotPassword} headerText = 'დაგავიწყდათ პაროლი?' onCloseModal = {this.handleModalClose}>
                    <Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.username')} 
                        value = {this.state.userName}
                        onInput = {(e)=> this.setState({userName: e.target.value})}/>
                    <Button  buttonClass = 'button-sm gray' clicked = {this.handleCheckUser}> შემდეგი</Button>    
                </Modal>
                <div className = 'LoginWrap'>
                    <div className='Login-leftSide'>
                        <div className = 'LoginHeader'>
                            <span>მოგესალმებით</span>
                        </div>
                        <div className = 'Login-inputs'>
                            < Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.username')} 
                                value = {this.state.userName}
                                onInput = {(e)=> this.setState({userName: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = Lang.tr('auth.username')}
                                rule = {"email"}/>
                            < Input className = 'Input Input-bg' type = 'text' placeholder = {Lang.tr('auth.password')}
                                onInput = {(e)=> this.setState({password: e.target.value})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = Lang.tr('auth.password')}
                                rule = {'required'}/>    
                        </div>
                        <div className = 'LoginOptions'>
                            <label>
                                <input type = 'checkbox'/>
                                <span>მომხმარებლის დამახსოვრება</span>
                            </label>
                            
                           
                            <span onClick = {()=> this.setState({forgotPassword: true})}>დაგავიწყდა პაროლი?</span>
                        </div>
                        <div className = 'LoginFooter'>
                            <Button  buttonClass = 'button-sm gray'> რეგისტრაცია</Button>
                            <Button  clicked = {this.login} buttonClass = 'button-sm green'>შესვლა</Button>
                        </div>
                    </div>
                    <div className = 'Login-rightSide'>
                        <img src = '../../Assets/Images/LandingImg/login_img.svg' alt = 'login-img' />
                    </div>      
                </div>
            </Layout>
        );
    }
}

export default Login;