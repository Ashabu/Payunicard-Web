import React, {Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import PropTypes from 'prop-types'
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import UserBalance from './../../Components/UserBalance/UserBalance';
import CurrencyRates from './../../Components/CurrencyRates/CurrencyRates';
import AccountCard from './../../Components/Myproducts/AccountCard';
import { Icon, Backdrop, Loader, Widget, Search, SidePanel, OTP } from './../../Components/UI/UiComponents';
const MyProducts = (props) => {
    const {} = props
    const { state, setGlobalValue } = useContext(Context);
    const { userTransactions, userAccounts, userTotalBalance, currencyRates } = state;

    const [ UserAccounts, setUserAccounts ] = useState([]);

    useEffect(() => {
        setUserAccounts(userAccounts);
    }, [userAccounts]);


    const copyToClipboard = () => {

    };
    4 === '4'
    const handleSwitchCard = (curIndex, account) => {
        // let accIndex = UserAccounts.findIndex(a => a.accountNumber === account.accountNumber);
        // let tempAccounts = UserAccounts;
        // tempAccounts[accIndex]?.cards?.map((c, i) => {
        //     c.current = false;
        //     if(i === curIndex) {
        //         c.current = true;
        //     }
        //     return c
        // });
        // setUserAccounts([...tempAccounts]);
        let x = UserAccounts.filter(a => a.accountNumber === account.accountNumber);
        x.map(acc => {
            acc.cards.map((c,i) => {
                c.current = false;
                if(i === curIndex) {
                    c.current = true;
                    acc.mAskedCard = c.maskedCardNumber.slice(8, 16);
                }
                return c;
            })
            return acc;
        })

        setUserAccounts([...UserAccounts, ...x])
    }


    

    return (
        <AuthorizedLayout pageName = "ჩემი პროდუქტები">
       <div style = {{marginLeft: 200, height: 1000, width: "100%"}}>
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

              
       </div>     
       </AuthorizedLayout>
    )
}

MyProducts.propTypes = {

}

export default MyProducts;
