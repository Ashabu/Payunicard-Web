/* eslint-disable no-undef */
import React, {Component} from 'react';
import './dashboard.scss';
import User from '../../Services/API/UserServices';
import Layout from '../../Containers/Layout/Layout';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import {Backdrop, Button, Select, SelectList, SidePanel } from '../../Components/UI/UiComponents';



class Dashboard extends Component {

   
    

    state = {
        
        isInitialized: false,
        transactions: [],
        detailVisible: false,
        selectedTransaction: {},
        userAccounts: [],
        allUserCurrencies: [],
        selected: {}
    }

    componentDidMount() {
        // this.getTransactions();
        // this.getUserAccounts();
    }

  

    // getTransactions = async () => {
    //     if(Store.userStatements.length > 0) return;
    //     let blockedtr= [];
    //     let tr = [];
    //     User.GetUserBlockedFunds().then(res=>{
    //        if(res.data.ok){
    //            blockedtr = res.data.data.funds;
    //        }
    //     }).catch(error => {
    //        console.log(error)
    //     })
       
    //     User.GetUserAccountStatements().then(res => {
    //         if(res.data.ok) {
    //             tr = res.data.data.statements
    //             Store.setUserStatements([...blockedtr, ...tr])
    //             this.setState({isInitialized: true})
                
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }
    

    // getUserAccounts = async () => {
    //     let userUnicards = [];
    //      User.GetUnicards().then(res => {
    //         if(res.data.ok) {
    //             let tempUnicards = res.data.data.unicards;
    //             userUnicards =  tempUnicards.map(uni => {
    //                 let uCard = {
    //                     accountTypeName: "UniCard",
    //                     accountId: uni.card,
    //                     accountNumber: uni.card,
    //                     cardMask: `${'****' + uni.card.slice(12, 16)}`,
    //                     isUnicard: true,
    //                     availableInGEL: uni.amount,
    //                     cards: [],
    //                     currencies: [{ key: "GEL", value: "₾" }],
    //                     imageUrl: "/images/pngImages/Unicard.png",
    //                     isActive: true,
    //                     type: 7 // type 7 is custom type for unicard
    //                 }
    //                 return uCard
    //             })
                
    //         }
    //     })

    //     let userAccounts = [];
    //      User.GetUserAccounts().then(res => {
    //         if(res.data.ok) {
    //             userAccounts = res.data.data.accountBallances;
    //             userAccounts.map(account => {
    //                 if(account.customerPaketId === 2) {
    //                   account.accountTypeName = "UPERA"
    //                 } else if (account.customerPaketId === 3) {
    //                   account.accountTypeName = "UNICARD PLUS"
    //                 } else if (account.customerPaketId === 4) {
    //                   account.accountTypeName = "UNICARD ULTRA"
    //                 }

    //                 let cards = account?.cards || [];
    //                   if (cards.length) {
    //                       let mask = cards[0].maskedCardNumber.slice(8, 16);
    //                       account.cardMask = mask;
    //                       account.cards.map((card, i) => {
    //                           if (i === 0) {
    //                               card.chosen = true;
    //                           }
    //                           else {
    //                               card.chosen = false;
    //                           }
    //                           return card;
    //                       })
    //                   };

    //                   account.currencies.map(currency => {
    //                       if (currency.key === "GEL") {
    //                           currency.balance = account.balanceInGEL
    //                           currency.availableBal = account.availableInGEL
    //                       } else if (currency.key === "USD") {
    //                           currency.balance = account.balanceInUSD
    //                           currency.availableBal =account.availableInUSD 
    //                       } else if (currency.key === "EUR") {
    //                           currency.balance = account.balanceInEUR
    //                           currency.availableBal = account.availableInEUR
    //                       } else if (currency.key === "GBP") {
    //                           currency.balance = account.balanceInGBP
    //                           currency.availableBal = account.availableInGBP
    //                       } else if (currency.key === "TRY") {
    //                           currency.balance = account.balanceInTRY
    //                           currency.availableBal = account.availableInTRY
    //                       } else {
    //                           currency.balance = account.balanceInRUB
    //                           currency.availableBal = account.availableInRUB
    //                       }
    //                       return currency
    //                   })
    //                   return account;
    //               });

    //             let currencyTitle = {
    //                 geo: [
    //                     { v: 'GEL', title: 'ლარი' }, 
    //                     { v: 'USD', title: 'აშშ დოლრი'},  
    //                     { v: 'EUR', title: 'ევრო' },  
    //                     { v: 'GBP', title: 'გირვანქა სტერლინგი' }, 
    //                     { v: 'TRY', title: 'თურქული ლირა' },
    //                     { v: 'RUB', title: 'რუსული რუბლი' }
    //                 ],
    //                 eng: [
    //                     { v: 'GEL', title: 'Georgian Lari' }, 
    //                     { v: 'USD', title: 'US Dollar'},  
    //                     { v: 'EUR', title: 'Euro' },  
    //                     { v: 'GBP', title: 'British Pound Sterling' }, 
    //                     { v: 'TRY', title: 'Turkish Lyra' },
    //                     { v: 'RUB', title: 'Russian Ruble' }
    //                 ]
    //              }
                
    //             let allUserCurrencies = [];

    //             [...userAccounts].forEach(acc => {
    //                 [...acc.currencies].forEach(cur => {
    //                     if(allUserCurrencies.filter(item => item.value === cur.value).length <= 0) {
    //                         cur.title = currencyTitle[Store.lang].filter(el => el.v === cur.key)[0]?.title || '';
    //                         allUserCurrencies.push(cur)
    //                     }
    //                 });
    //             })
    //             this.setState({userAccounts: [...userAccounts,...userUnicards], allUserCurrencies})
    //             Store.setUserAccounts([...userAccounts,...userUnicards])
    //             Store.setAllUserCurrencies(allUserCurrencies)
                
    //         }
    //     })
    // }
   

    handleTransactionDetailView = (transaction) => {
        if(transaction.tranID){ 
            User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
                if(res.data.ok) {
                    this.setState({selectedTransaction: res.data.data})
                } else {
                    console.log(error)
                }
            }).catch(error => {
                console.log(error)
            })
            this.props.history.push({
                pathname: '/Dashboard/TransactionDetail',
                search: `?tranId=${transaction.tranID}`,
            })
        } else {
            this.setState({selectedTransaction: transaction})
            this.props.history.push({
                pathname: '/Dashboard/TransactionDetail',
                search: `?cardNumber=${transaction.cardNumber}`,
            })
            
        }
        
    }


    render() {
        
        if(!this.state.isInitialized) return null;
        
        return (
          
          <Layout >
              <Backdrop show = {this.state.detailVisible} hide = {()=> {this.props.history.goBack(); this.setState({detailVisible: false})}}/>
                <SidePanel
                    stepBack 
                    visible = {this.state.detailVisible}
                    closePanel = {()=> {this.setState({detailVisible: false}); this.props.history.goBack()}}>
                        <TransactionDetailView transaction = {this.state.selectedTransaction}/>
                    </SidePanel>
                <div style ={{maxWidth: 485}}>
                
                    {/* <Select 
                        data={this.state.userAccounts} 
                        placeholder = 'Please Select'
                        selected = {this.state.selected.accountNumber}
                        display ={(element, setVisible) => (
                        <SelectList  
                            listClass = 'selectLIst' 
                            key={element.accountNumber} 
                            clicked={() => {this.setState({selected: element, }); setVisible(false);}} >
                                 {element.accountNumber} 
                        </SelectList>
                    )}/> */}
                    <p style={{display: 'flex', justifyContent: 'center'}}>WELCOME TO Dashboard</p>
                    <div>
                    <Button clicked = {()=>this.props.history.push('/transactions')}>go to transaction page</Button>
                </div>
                    {this.state.userStatements.map((transaction, index) =>
                        (<TransactionDetail 
                            key = {index} 
                            transaction = {transaction}  
                            clicked = {() =>  {this.handleTransactionDetailView(transaction); this.setState({detailVisible: true})}}
                            />))}
                </div>
                
            </Layout>
        );
    }
}

export default Dashboard;