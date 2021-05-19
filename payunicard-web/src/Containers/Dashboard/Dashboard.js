/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import { Context } from '../../Context/AppContext';
import './dashboard.scss';
import User from '../../Services/API/UserServices';
import Layout from '../../Containers/Layout/Layout';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import { Backdrop, Button, Select, SelectList, SidePanel } from '../../Components/UI/UiComponents';




const  Dashboard = () => {

    const { state } = useContext(Context);
    const { userTransactions, userAccounts } = state;
    
    const history = useHistory();

    const [isInitialized, setIsInitialized] = useState(false);

    const [detailVisible, setDetailVisible] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState({});

    const [selected, setSelected] = useState({}); 

   useEffect(() => {

   }, [userTransactions,userAccounts ])
   

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
        
        return (
          
          <Layout >
              <Backdrop show = {detailVisible} hide = {() => {history.goBack(); setDetailVisible(false)}}/>
                <SidePanel
                    stepBack 
                    visible = {detailVisible}
                    closePanel = {()=> {setDetailVisible(false); history.goBack()}}>
                        <TransactionDetailView transaction = {selectedTransaction}/>
                    </SidePanel>
                <div style ={{maxWidth: 485}}>
                
                    <Select 
                        data={userAccounts} 
                        placeholder = 'Please Select'
                        selected = {selected.accountNumber}
                        display ={(element, setVisible) => (
                        <SelectList  
                            listClass = 'selectLIst' 
                            key={element.accountNumber} 
                            clicked={() => {setSelected(element); setVisible(false);}} >
                                 {element.accountNumber} 
                        </SelectList>
                    )}/>
                    <p style={{display: 'flex', justifyContent: 'center'}}>WELCOME TO Dashboard</p>
                    <div>
                    <Button clicked = {() => history.push('/transactions')}>go to transaction page</Button>
                </div>
                    {userTransactions.map((transaction, index) =>
                        (<TransactionDetail 
                            key = {index} 
                            transaction = {transaction}  
                            clicked = {() =>  {handleTransactionDetailView(transaction); setDetailVisible(true)}}
                            />))}
                </div>
                
            </Layout>
        );
    
}

export default Dashboard;