import React, { useEffect, useState, useContext } from 'react';
import './authLayout.scss';
import { User, Currency, Presentation, Template } from '../../Services/API/APIS';
import NavigationPanel from '../../Components/Navigation/NavigationPanel/NavigationPanel';
import { Context } from '../../Context/AppContext';
import AuthorizedFooter from '../../Components/Navigation/AuthFooter/AuthorizedFooter';
import AuthorizedHeader from '../../Components/Navigation/AuthHeader/AuthorizedHeader';






const  Layout = (props) =>  {

    const { state, setGlobalValue } = useContext(Context)
    const { currencyRates, userAccounts, paymentServices, paymentTemplates, transferTemplates,  
        userDetails, userTotalBalance, activeLang, isUserAuthorized } = state;



    useEffect(() => {
        getUserAccounts();
        getUserTotalBalance();
        getCurrencyRates();
        getPaymetnServices();
        getPaymentTemplates();
        getTransferTemplates();

    }, [isUserAuthorized])

 

    const getUserAccounts = async () => {
        
        if(userAccounts.length > 0 || !isUserAuthorized) return;
        let userUnicards = [];
         User.GetUnicards().then(res => {
            if(res.data.ok) {
                let tempUnicards = res.data.data.unicards;
                userUnicards =  [...tempUnicards].map(uni => {
                    let uCard = {
                        accountTypeName: "UniCard",
                        accountId: uni.card,
                        accountNumber: uni.card,
                        cardMask: `${'****' + uni.card.slice(12, 16)}`,
                        isUnicard: true,
                        availableInGEL: uni.amount,
                        cards: [],
                        currencies: [{ key: "GEL", value: "₾", balance: uni.amount/10 }],
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
                                  card.current = true;
                              }
                              else {
                                  card.current = false;
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
             
            [...UserAccounts].forEach(acc => {
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

    

    const getUserTotalBalance = () => {
        if(userTotalBalance.length > 0 ||  !isUserAuthorized) return;
        User.GetUserTotalBalance().then(res => {
            if(res.data.ok){
                setGlobalValue({ userTotalBalance: res.data.data })
            }
        })
    }

    const getCurrencyRates = () => {
        if(currencyRates.length > 0 ||  !isUserAuthorized) return;

        Currency.GetCurrencyRates().then(res => {
            if(res.data.ok) {
                setGlobalValue({currencyRates: res.data.data.currencyRates})
            }
        })
    } 
    
    const getPaymetnServices = () => {
        if(paymentServices.length > 0 ||  !isUserAuthorized) return;
        Presentation.getPaymentServices().then(res => {
            if(res.data.ok) {
                setGlobalValue({paymentServices: res.data.data.categories});
            }
            
        })
    }

    const getPaymentTemplates = () => {
        if(paymentTemplates.length > 0 ||  !isUserAuthorized) return;
        Template.getUtilityTemplates().then(res => {
            if(res.data.ok) {
                let paymentTemplates = res.data.data.templates;
                paymentTemplates.map(t => {
                    t.checked = true;
                    return t
                })
                setGlobalValue({paymentTemplates})
                
            }
        })
    }

    const getTransferTemplates = () => {
        if(transferTemplates.length > 0 || !isUserAuthorized) return;
        Template.getTransferTemplates().then(res => {
            if(res.data.ok) {
                setGlobalValue({transferTemplates: res.data.data.templates})
            }
        })
    }


        return (
            
                <React.Fragment>
                    <AuthorizedHeader pageName = { props.pageName}/>
                        <div style={{display: 'flex'}}>
                            
                                <NavigationPanel/>
                            
                            {props.children}
                        </div>
                    <AuthorizedFooter/>
                </React.Fragment>
        );
}

export default Layout;