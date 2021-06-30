import React, {Fragment, useState, useEffect, useContext } from 'react';
import './myProducts.scss';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import PropTypes from 'prop-types'
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import UserBalance from './../../Components/UserBalance/UserBalance';
import CurrencyRates from './../../Components/CurrencyRates/CurrencyRates';
import ActiveCard from '../../Components/Myproducts/ActiveCard';
import BankCard from '../../Components/MyProducts/BankCard';
import BlockedCard from '../../Components/Myproducts/BlockedCard';
import BankDetail from './../../Components/Myproducts/BankDetail';
import { Icon, Backdrop, Loader, Widget, Search, SidePanel, OTP } from './../../Components/UI/UiComponents';
import { User } from '../../Services/API/APIS';
const MyProducts = (props) => {
    const {} = props
    const { state, setGlobalValue } = useContext(Context);
    const { allUserCurrencies, userTransactions, userAccounts, userTotalBalance, currencyRates,  } = state;

    const [ UserAccounts, setUserAccounts ] = useState([]);
    const [ userBankCards, setUserBankCards ] = useState([]);

    useEffect(() => {
        setUserAccounts(userAccounts);
    }, [userAccounts]);

    useEffect(() => {
        getUserBankCards();
    }, []);


    const getUserBankCards = () => {
        User.GetUserBankCards().then(res => {
            if(res.data.ok){
                setUserBankCards(res.data.data.bankCards);
            }
        }).catch(error => { console.log(error) })
    }

    const copyToClipboard = () => {

    };
    const handleSwitchCard = (curIndex, account) => {
        let accIndex = UserAccounts.findIndex(a => a.accountNumber === account.accountNumber);
        let tempUserAccounts = UserAccounts;
        tempUserAccounts[accIndex]?.cards?.map((c, i) => {
            c.current = false;
            if(i === curIndex) {
                c.current = true;
                tempUserAccounts[accIndex].mAskedCard = c.maskedCardNumber.slice(8, 16);
            }
            return c
        });
        setUserAccounts([...tempUserAccounts]);
    };




    

    return (
        <AuthorizedLayout pageName = "ჩემი პროდუქტები">
           
       <div className = 'myProducts-wrap' >
           

        <div className = 'ac-leftSide'>
            <UserBalance userBalance = { userTotalBalance } />

            <Widget>
                <p>აქტიური ანგარიშები და ბარათები</p>
                <div className = 'ac-activeCards'>
                    {UserAccounts.map((acc, index) => (
                        <ActiveCard key = { index } account = { acc } onCopy = { copyToClipboard } onSwitch = { handleSwitchCard}/>
                    ))}
                </div>
            </Widget>

            <Widget>
                <p>დამატებული ბარათები</p>
                <div style = {{display: 'flex', flexWrap: 'wrap'}}>
                    {userBankCards?.map((card, index) => (
                        <BankCard key = { index } bankCard = { card }/>
                    ))}
                </div>
            </Widget>

            <Widget>
                <p>არააქტიური ბარათები</p>
                <div style = {{display: 'flex', flexWrap: 'wrap'}}>
                  {UserAccounts?.map((acc, index) => (
                        <BlockedCard key = { index } account = { acc } />
                    ))}
                </div>
            </Widget>
        </div>

        <div className = 'ac-rightside'>
            <CurrencyRates currencyrates = { currencyRates }/>

            <Widget>    
                <p>საფულის შევსება</p>
                <p>საბანკო რეკვიზიტები</p>
                    {allUserCurrencies?.map((cur, index) =>(
                       <BankDetail key = { index } allUserCurrencies = { cur }/>
                    ))}  
            
                <div className = 'ac-withCard'>
                    <div className = 'visa-master'>
                         <img src = '../../Assets/Images/visa-logo-bg.png' alt= 'visa-logo' />
                         <img src = '../../Assets/Images/mc-logo-bg.png' alt= 'visa-logo' />
                    </div>
                    <ul>
                        <li>*საკომისიო:</li>
                        <li>ქართული ბანკის ბარათი - 15% - 2%</li>    
                        <li>უცხოური ბანკის ბარათი - 2.5%</li> 
                    </ul>
                </div>
                <p>სწრაფი გადახდის აპარატები</p>
                <div className = 'ac-fastPayment'>
                    <div className = 'partner'>
                        <img src = '../../Assets/Images/tbc-pay.png' alt = 'tbc-pay'/>
                    </div>
                    <div className = 'partner'>
                        <img src = '../../Assets/Images/oppa.png' alt = 'oppa'/>
                    </div>
                    <div className = 'partner'>
                        <img src = '../../Assets/Images/vtb.png' alt = 'vtb'/>
                    </div>
                </div>   
            </Widget>
        </div>
                

              
       </div>     
       </AuthorizedLayout>
    )
}

MyProducts.propTypes = {

}

export default MyProducts;
