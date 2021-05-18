import React, { useEffect, useState } from 'react';
import User from '../../Services/API/UserServices';
import Header from '../../Components/Navigation/Header/Header';
import Footer from '../../Components/Navigation/Footer/Footer';
import './layout.scss';




const  Layout = (props) =>  {


useEffect(() => {
    // getUserAccounts();
}, [])

    const getUserAccounts = async () => {
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

        let userAccounts = [];
         User.GetUserAccounts().then(res => {
            if(res.data.ok) {
                userAccounts = res.data.data.accountBallances;
                userAccounts.map(account => {
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
                        cur.title = currencyTitle[Store.lang].filter(el => el.v === cur.key)[0]?.title || '';
                        allUserCurrencies.push(cur)
                    }
                });
            })
            Store.setUserAccounts([...userAccounts,...userUnicards])
            Store.setAllUserCurrencies(allUserCurrencies)
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