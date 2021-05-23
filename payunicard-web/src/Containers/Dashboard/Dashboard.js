/* eslint-disable no-undef */
import React, {Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import './dashboard.scss';
import { User } from '../../Services/API/APIS';
import { Backdrop, Button, Select, SelectList, SidePanel, Widget } from '../../Components/UI/UiComponents';
import Layout from '../../Containers/Layout/Layout';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import UserBalance from './../../Components/UserBalance/UserBalance';
import UserProducts from './../../Components/UserProducts/UserProducts';
import CurrencyRates from './../../Components/CurrencyRates/CurrencyRates';
import UserVerificationstatus from '../../Components/UserVerificationStatus/UserVerificationStatus';




const  Dashboard = () => {

    const { state, setGlobalValue } = useContext(Context);
    const { userTransactions, userAccounts, userTotalBalance, currencyRates, userVerificationStatus } = state;
    
    const history = useHistory();

    const [isInitialized, setIsInitialized] = useState(false);

    const [detailVisible, setDetailVisible] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState({});

    const [selected, setSelected] = useState({}); 

    const [ userProducts, setUserProducts ] = useState([]);

    useEffect(() => {
    
    }, [userTotalBalance, userTransactions])

    useEffect(() => {
        getUserDetails();
        getUserProducts();
    }, [])
   
   

    const handleTransactionDetailView = (transaction) => {
        if(transaction.tranID){ 
            User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
                if(res.data.ok) {
                    setSelectedTransaction(res.data.data)
                } else {
                    console.log(error)
                }
            }).catch(error => {
                console.log(error)
            })
                history.push({
                pathname: '/Dashboard/TransactionDetail',
                search: `?tranId=${transaction.tranID}`,
            })
        } else {
            setSelectedTransaction(transaction)
                history.push({
                pathname: '/Dashboard/TransactionDetail',
                search: `?cardNumber=${transaction.cardNumber}`,
            })
            
        }
        
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
        
    console.log('verification status ==>', userVerificationStatus)
        return (
          
            <Layout >
              <Backdrop show = {detailVisible} hide = {() => {history.goBack(); setDetailVisible(false)}}/>

                <SidePanel
                    stepBack 
                    visible = {detailVisible}
                    closePanel = {()=> {setDetailVisible(false); history.goBack()}}>
                        <TransactionDetailView transaction = {selectedTransaction}/>
                </SidePanel>
               
                <div style ={{maxWidth: 485, marginLeft: 150}}>
                    <UserVerificationstatus/>

                    <p style={{display: 'flex', justifyContent: 'center'}}>WELCOME TO Dashboard</p>
                    
                    <UserBalance userBalance = { userTotalBalance } />

                    <UserProducts userproducts = { userProducts }/>

                    <CurrencyRates currencyrates = { currencyRates }/>    

                    <Widget>
                        <p onClick = {() => history.push('/transactions')}>ტანზაქციები</p>
                        {userTransactions.map((transaction, index) =>
                            (<TransactionDetail 
                                key = {index} 
                                transaction = {transaction}  
                                clicked = {() =>  {handleTransactionDetailView(transaction); setDetailVisible(true)}}
                                />))}
                        <Button buttonClass = 'loadmore'   clicked = {() => history.push('/transactions')}>მეტი</Button>             
                    </Widget>
                </div>
              
            </Layout>
        );
    
}

export default Dashboard;