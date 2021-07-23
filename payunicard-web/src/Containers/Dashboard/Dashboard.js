/* eslint-disable no-undef */
import React, {Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import './dashboard.scss';
import { KYC, User } from '../../Services/API/APIS';
import { Backdrop, Button, AppInput, Select, SelectList, SidePanel, Widget } from '../../Components/UI/UiComponents';
import TransactionDetail from '../../Components/TransactionDetails/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import UserBalance from './../../Components/UserBalance/UserBalance';
import UserProducts from './../../Components/UserProducts/UserProducts';
import CurrencyRates from './../../Components/CurrencyRates/CurrencyRates';
import UserVerificationstatus from '../../Components/UserVerificationStatus/UserVerificationStatus';
import {handleTransactionDetailView } from '../../Providers/TransactionProvider';
import OTP from '../../Components/UI/OTP/OTP';
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import Verification from './../Verification/Verification';
import KvalifikaFrame from './../../Components/Kvalifika/KvalifikaFrame';
import OtpBox from '../../Components/UI/Otp-Box/Otp-Box';
import PropgreSteps from '../../Components/UI/ProgressSteps/PropgreSteps';
PropgreSteps




const  Dashboard = () => {

    const { state, setGlobalValue } = useContext(Context);
    const { userTransactions, userAccounts, userTotalBalance, currencyRates, userVerificationStatus } = state;
    
    const history = useHistory();

    const [isInitialized, setIsInitialized] = useState(false);

    const [detailVisible, setDetailVisible] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState({});

    const [selected, setSelected] = useState({}); 

    const [ userProducts, setUserProducts ] = useState([]);

    const [ startVerification, setStartVerification ] = useState(true);

    const [ kycFrameUrl, setKycFrameUrl ] = useState('');

    useEffect(() => {
    
    }, [userTotalBalance, userTransactions])

    useEffect(() => {
        getUserDetails();
        getUserProducts();
        getTransactions();
    }, []);
   
   const navigate = (id) => {
       history.push(
           {
            pathname: '/Dashboard/TransactionDetail',
            search: `?tranId=${id}`,
           }
       )
   }

   const  getTransactions = async () => {
    if(userTransactions.length > 0 ) return;
    
    let blockedtr= [];
    let tr = [];
    User.GetUserBlockedFunds().then(res=>{
       if(res.data.ok){
           blockedtr = res.data.data.funds;
       }
    }).catch(error => {
       console.log(error)
    })
   
    User.GetUserAccountStatements().then(res => {
        if(res.data.ok) {
            tr = res.data.data.statements
            setGlobalValue({ userTransactions: [...blockedtr, ...tr] })
        }
    }).catch(error => {
        console.log(error)
    })
}


    const getUserProducts= () => {
        User.GetUserProducts().then(res => {
            if(res.data.ok) {
                setUserProducts(res.data.data.products);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getUserDetails = () => {
        User.GetUserDetails().then(res => {
            let verificationStatus = "";
            if(res.data.ok) {
                if(res.data.data.documentVerificationStatusCode === "Enum_Verified" && res.data.data.customerVerificationStatusCode === "Enum_Verified") {
                    verificationStatus = "Verified";
                } else {
                    verificationStatus = 'Not Verified'
                }
            }

            setGlobalValue({ userVerificationStatus: verificationStatus })
        }).catch((error) => {
            console.log(error)
        })
    }


    














        
        return (
          
            <AuthorizedLayout pageName = "მთავარი გვერდი">

               
              <Backdrop show = {detailVisible || startVerification} hide = {() => {setDetailVisible(false)}}/>
            <Verification visible = { startVerification} close = {() => setStartVerification(false)}/>
                <SidePanel
                    stepBack 
                    visible = {detailVisible}
                    closePanel = {()=> {setDetailVisible(false); history.goBack()}}>
                        <TransactionDetailView transaction = {selectedTransaction}/>
                </SidePanel>
               
                <div style ={{maxWidth: 485, marginLeft: 150}}>
                    <UserVerificationstatus/>
                    <OtpBox count = {4}/>
                    <PropgreSteps stepCount = { 9}/>
                    {/* <Button clicked = {startKycSession}>კვალიფიკა</Button> */}
                    <Button clicked = {() => setStartVerification(true)}>ვერიფიკაცია</Button>
                    <Button clicked = {()=> history.push('/payments')}>go to payments</Button>
                    <Button clicked = {()=> history.push('/transfers')}>go to transfers</Button>

                    <p style={{display: 'flex', justifyContent: 'center'}}>WELCOME TO Dashboard</p>

                    <div>
                        <UserBalance userBalance = { userTotalBalance } />

                        <Widget>
                            <div className = 'service-widget'>
                                <div>
                                    <img src = '../../Assets/Images/Top_Up.svg' alt = 'icon' />
                                    <span>შევსება</span>
                                </div>
                                <div>
                                    <img src = '../../Assets/Images/Add_Card.svg' alt = 'icon' />
                                    <span>საბანკო ბარათის დამატება</span>
                                </div>
                            </div>    
                        </Widget>
                    </div>
                   
                    <div>
                        <UserProducts userproducts = { userProducts }/>
                    </div>
                    <CurrencyRates currencyrates = { currencyRates }/>    

                    <Widget>
                        <p onClick = {() => history.push('/transactions')}>ტანზაქციები</p>
                        {userTransactions.map((transaction, index) =>
                            (<TransactionDetail 
                                key = {index} 
                                transaction = {transaction}  
                                clicked = {() =>  {handleTransactionDetailView(transaction, setSelectedTransaction, navigate); setDetailVisible(true)}}
                                />))}
                        <Button buttonClass = 'loadmore'   clicked = {() => history.push('/transactions')}>მეტი</Button>             
                    </Widget>
                </div>
              
            </AuthorizedLayout>
        );
    
}

export default Dashboard;