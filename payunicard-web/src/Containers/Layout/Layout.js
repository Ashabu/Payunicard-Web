import React, { useEffect, useState, useContext } from 'react';
import './layout.scss';
import User from '../../Services/API/UserServices';
import Header from '../../Components/Navigation/Header/Header';
import Footer from '../../Components/Navigation/Footer/Footer';
import { Context } from '../../Context/AppContext';






const  Layout = (props) =>  {

    const { state, setGlobalValue } = useContext(Context)
    const { userAccounts,  paymentTemplates, userTransactions, transactionTemplates,  userDetails, userTotalBalance, activeLang } = state;



useEffect(() => {
    getUserAccounts();
    getTransactions();
    getUserTotalBalance();
}, [])




    const getUserAccounts = async () => {
        if(userAccounts.length > 0) return;
        let userUnicards = [];
         User.GetUnicards().then(res => {
            if(res.data.ok) {
                let tempUnicards = res.data.data.unicards;
                userUnicards =  tempUnicards.map(uni => {
                    let uCard = {
                        accountTypeName: "UniCard",
                        accountId: uni.card,
                        accountNumber: uni.card,
                        cardMask: `${'****' + uni.card.slice(12, 16)}`,
                        isUnicard: true,
                        availableInGEL: uni.amount,
                        cards: [],
                        currencies: [{ key: "GEL", value: "₾" }],
                        imageUrl: "/images/pngImages/Unicard.png",
                        isActive: true,
                        type: 7 // type 7 is custom type for unicard
                    }
                    return uCard
                })
                
            }
        })

        let UserAccounts = [];
         User.GetUserAccounts().then(res => {
            if(res.data.ok) {
                UserAccounts = res.data.data.accountBallances;
                UserAccounts.map(account => {
                    if(account.customerPaketId === 2) {
                      account.accountTypeName = "UPERA"
                    } else if (account.customerPaketId === 3) {
                      account.accountTypeName = "UNICARD PLUS"
                    } else if (account.customerPaketId === 4) {
                      account.accountTypeName = "UNICARD ULTRA"
                    }

                    let cards = account?.cards || [];
                      if (cards.length) {
                          let mask = cards[0].maskedCardNumber.slice(8, 16);
                          account.cardMask = mask;
                          account.cards.map((card, i) => {
                              if (i === 0) {
                                  card.chosen = true;
                              }
                              else {
                                  card.chosen = false;
                              }
                              return card;
                          })
                      };

                      account.currencies.map(currency => {
                          if (currency.key === "GEL") {
                              currency.balance = account.balanceInGEL
                              currency.availableBal = account.availableInGEL
                          } else if (currency.key === "USD") {
                              currency.balance = account.balanceInUSD
                              currency.availableBal =account.availableInUSD 
                          } else if (currency.key === "EUR") {
                              currency.balance = account.balanceInEUR
                              currency.availableBal = account.availableInEUR
                          } else if (currency.key === "GBP") {
                              currency.balance = account.balanceInGBP
                              currency.availableBal = account.availableInGBP
                          } else if (currency.key === "TRY") {
                              currency.balance = account.balanceInTRY
                              currency.availableBal = account.availableInTRY
                          } else {
                              currency.balance = account.balanceInRUB
                              currency.availableBal = account.availableInRUB
                          }
                          return currency
                      })
                      return account;
                  });
            }
            let currencyTitle = {
                geo: [
                    { v: 'GEL', title: 'ლარი' }, 
                    { v: 'USD', title: 'აშშ დოლრი'},  
                    { v: 'EUR', title: 'ევრო' },  
                    { v: 'GBP', title: 'გირვანქა სტერლინგი' }, 
                    { v: 'TRY', title: 'თურქული ლირა' },
                    { v: 'RUB', title: 'რუსული რუბლი' }
                ],
                eng: [
                    { v: 'GEL', title: 'Georgian Lari' }, 
                    { v: 'USD', title: 'US Dollar'},  
                    { v: 'EUR', title: 'Euro' },  
                    { v: 'GBP', title: 'British Pound Sterling' }, 
                    { v: 'TRY', title: 'Turkish Lyra' },
                    { v: 'RUB', title: 'Russian Ruble' }
                ]
             }
            
            let allUserCurrencies = [];
    
            [...userAccounts].forEach(acc => {
                [...acc.currencies].forEach(cur => {
                    if(allUserCurrencies.filter(item => item.value === cur.value).length <= 0) {
                        cur.title = currencyTitle[activeLang].filter(el => el.v === cur.key)[0]?.title || '';
                        allUserCurrencies.push(cur)
                    }
                });
            })

            setGlobalValue({ userAccounts:[ ...UserAccounts,...userUnicards], allUserCurrencies })
            
        })
    }

    const  getTransactions = async () => {
        if(userTransactions.length > 0) return;
        
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


    const getUserTotalBalance = () => {
        if(userTotalBalance.length > 0) return;
        
        User.GetUserTotalBalance().then(res => {
            if(res.data.ok){
                setGlobalValue({ userTotalBalance: res.data.data })
            }
            console.log(res.data.data)
        })
    }
    
        return (
            
                <React.Fragment>
                    <Header/>
                        <div style={{padding: 30}}>
                            {props.children}
                        </div>
                    <Footer/>
                </React.Fragment>
        );
}

export default Layout;