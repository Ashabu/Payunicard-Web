import React, { Component } from 'react';
import './userRegistration.scss';
import Codes from '../../Services/Data/CountryCodes';
import Input from '../../Components/UI/Input/Input';
import Select from '../../Components/UI/Select/Select';
import Selectlist from '../../Components/HOC/SelectList/SelectLIst';
import Layout from '../Layout/Layout'

class UserRegistration extends Component {

    state = {
        selected:{},
        mobileNumber: null,
        username: '',
        surname: '',
        email: '',
        birthDate: '',
        personalNumber: '',
        password: '',
        repPassword: '',
        repPasswordError: '',
        

    }
    render() {
        let  repPasswordError = null;
        const onRepeatePasswordCheck = () => {
        if(this.state.password !== '' &&  this.state.repPassword !== '' &&( this.state.repPassword !== this.state.password)) {
            this.setState({repPasswordError: 'პაროლები არ ემთხვევა'})
             repPasswordError =  (<span>{this.state.repPasswordError}</span>)
        }
        }
        

        return (
            <Layout>
                <div className = 'RegWrap'>
                    <div className = 'RegLeft'>
                        <div className = 'mobileNumber'>
                            <Select 
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
                                onChange = {onRepeatePasswordCheck()} />
                                {repPasswordError}
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