import React, {Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import PropTypes from 'prop-types'
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import UserBalance from './../../Components/UserBalance/UserBalance';
import CurrencyRates from './../../Components/CurrencyRates/CurrencyRates';
import AccountCard from './../../Components/Myproducts/AccountCard';
import BankCard from '../../Components/MyProducts/BankCard';
import { Icon, Backdrop, Loader, Widget, Search, SidePanel, OTP } from './../../Components/UI/UiComponents';
import { User } from '../../Services/API/APIS';
const MyProducts = (props) => {
    const {} = props
    const { state, setGlobalValue } = useContext(Context);
    const { userTransactions, userAccounts, userTotalBalance, currencyRates } = state;

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
       <div style = {{marginLeft: 200, height: 'auto', width: "100%"}}>
           <h1>MyProducts</h1>
           <UserBalance userBalance = { userTotalBalance } />
           <CurrencyRates currencyrates = { currencyRates }/>

            <Widget>
                <p>აქტიური ანგარიშები და ბარათები</p>
                <div style = {{display: 'flex', flexWrap: 'wrap'}}>
                {UserAccounts.map((acc, index) => (
                    <AccountCard key = { index } account = { acc } onCopy = { copyToClipboard } onSwitch = { handleSwitchCard}/>
                ))}
                </div>
                

            </Widget>
            <Widget>
                <p>დამატებული ბარათები</p>
                {userBankCards?.map((card, index) => (<BankCard key = { index } bankCard = { card }/>))}
            </Widget>

              
       </div>     
       </AuthorizedLayout>
    )
}

MyProducts.propTypes = {

}

export default MyProducts;
