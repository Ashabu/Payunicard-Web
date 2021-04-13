import React, { Component } from 'react';
import './login.scss';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Layout from '../Layout/Layout';
import User from '../../Services/API/UserServices';

class Login extends Component {

    state = {
        userName: "",
        password: ""
    }


    render() {
        return (
            <Layout>
                <div className = 'LoginWrap'>
                    <div className='Login-leftSide'>
                        <div className = 'LoginHeader'>
                            <span>მოგესალმებით</span>
                        </div>
                        <div className = 'Login-inputs'>
                            <Input type = 'text' placeholder = 'User Name' 
                                onInput = {(e)=> this.setState({userName: e.target.vaue})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'User Name'}/>
                            <Input type = 'text' placeholder ='Password' 
                                onInput = {(e)=> this.setState({password: e.target.vaue})}
                                onFocus = {(e) => e.target.placeholder = ""}
                                onBlur = {(e) => e.target.placeholder = 'Password'}/>    
                        </div>
                        <div className = 'LoginOptions'>
                            <label>
                                <input type = 'checkbox'/>
                                <span>მომხმარებლის დამახსოვრება</span>
                            </label>
                            
                           
                            <span>დაგავიწყდა პაროლი?</span>
                        </div>
                        <div className = 'LoginFooter'>
                            <Button buttonClass = 'button-sm gray'> რეგისტრაცია</Button>
                            <Button buttonClass = 'button-sm green'>შესვლა</Button>
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