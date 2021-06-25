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

    const { state, setGlobalValue } = useContext(Context);
    const { userTransactions, userAccounts, userTotalBalance, currencyRates } = state;

    const {} = props

    return (
        <AuthorizedLayout pageName = "ჩემი პროდუქტები">
       <div style = {{marginLeft: 200, height: 1000, width: "100%"}}>
           <h1>MyProducts</h1>
           <UserBalance userBalance = { userTotalBalance } />
           <CurrencyRates currencyrates = { currencyRates }/>

            <Widget>
                <p>აქტიური ანგარიშები და ბარათები</p>
                <div style = {{display: 'flex', flexWrap: 'wrap'}}>
                {userAccounts.map((acc, index) => (
                    <AccountCard key = { index } account = { acc }/>
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
