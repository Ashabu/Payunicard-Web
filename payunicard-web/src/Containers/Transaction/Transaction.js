import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/AppContext';
import { useHistory } from "react-router";
import './transaction.scss';
import PropTypes from 'prop-types';
import User from '../../Services/API/UserServices';
import ComonFn from '../../Services/CommonFunctions';
import { Backdrop, Calendar, Icon, Select, SelectList, Search, SidePanel, Button, Widget } from '../../Components/UI/UiComponents';
import Layout from '../../Containers/Layout/Layout';
import TransactionDetail from '../../Components/TransactionDetails/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import {handleTransactionDetailView } from '../../Providers/TransactionProvider';


const Transaction = () => {

    const { state } = useContext(Context);
    const { userAccounts, userTransactions, allUserCurrencies } = state;
    
    const history = useHistory();

    // const []
    const navigate = (id) => {
        history.push(
            {
             pathname: '/Transactions/TransactionDetail',
             search: `?tranId=${id}`,
            }
        )
    }

    const [dates, setDates ] = useState({
            fromDate: '',
            toDate: ''
        })

    const [ searchInTransaction, setSearchInTransaction ] = useState([]);

    const [ selectedTransaction, setSelectedTransaction ] = useState({});

    const [ selectedAccount, setSelectedAccount] = useState({});

    const [ selectedCurrency, setSelectedCurrency ] = useState({});

    const [ detailVisible, setDetailVisible ] = useState(false);

    const [ exportOptions, setExportOptions ] = useState(false);

    const [ searchValue, setSearchvalue ] = useState('');

    const [ rowValues, setRowValue ] = useState({count: 10, index: 0})



    useEffect(() => {
        setLastMonthInterval();
        if(searchInTransaction.length <= 0) setSearchInTransaction(userTransactions);
    }, [ searchInTransaction, userTransactions ])

   
    const setLastMonthInterval = () => {
        let curDate = new Date();
        let cMonth = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let cDay = ("0" + curDate.getDate()).slice(-2);
        let prevMonth = new Date();
        let prevDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);    
        let pMonth  = ("0" + (prevDate.getMonth() + 1)).slice(-2);
        let pDay = cDay;
        setDates(prevState => { return { ...prevState, fromDate:[prevDate.getFullYear(), pMonth, pDay].join("-"), toDate: [curDate.getFullYear(), cMonth, cDay].join("-") }})
    }
    
    
    const handleSearch = (value) => {
        let transactions = userTransactions;
        let filteredTransactions = [...transactions].filter(tr => {
            return tr.merchantDescription?.toLowerCase().match(value.toLowerCase()) || tr.description?.toLowerCase().match(value.toLowerCase()); 
        })
        if (value === '') {
            setSearchInTransaction(transactions);
        } else {
            setSearchInTransaction(filteredTransactions);
        }
    }


    const handleDate = (data) => {
        if(data.val === 'From') {
            setDates(prevState => { return { ...prevState, fromDate: data.fromDate }})
            handleLoadMoreTransactions();
        } else {
            setDates(prevState => { return { ...prevState, toDate: data.toDate }})
            handleLoadMoreTransactions(); 
            
        }

    }

   


    const handleLoadMoreTransactions = () => {
        setRowValue(prevState => { return  {...prevState, index: rowValues.index +=1 } })
        let addData = {
            Rowindex: rowValues.index,
            rowCount: rowValues.count
        }

        let params = {
            startDate: dates.fromDate,
            endDate : dates.toDate,
            accountID: selectedAccount.accountID || null
        }

        User.GetUserAccountStatements(  addData , { params }).then(res => {
            if(res.data.ok) {
                let moreTransactions = res.data.data.statements;
                setSearchInTransaction(prevState => { return [...prevState, ...moreTransactions] });

            }

            console.log(searchInTransaction)
        })
        


    }



   

        return (
            
                <Layout>

                <Backdrop show = { detailVisible } hide = {() => { history.goBack(); setDetailVisible(false) }}/>
                <SidePanel
                    stepBack 
                    visible = { detailVisible }
                    closePanel = {() => { setDetailVisible(false); history.goBack() }}>
                        <TransactionDetailView transaction = { selectedTransaction }/>
                    </SidePanel>
            <div className = 'transaction'>
            <p>ტრანზაქციები</p>

                <div className = 'transaction__header'>
                    <button onClick = {() => history.push('/dashboard') }>go dashboard</button>
                    <div className = 'transaction__header__search-options'>
                        <Calendar fromDate = { dates.fromDate } toDate = { dates.toDate } setDate = { handleDate }/>
                        <Search searchValue = {searchValue} onsearch = {handleSearch}/>
                        <div className = 'export' tabIndex = '0' onClick = {() => setExportOptions(true) } onBlur = {() => setExportOptions(false) } >
                            <div className = 'export__icon'  >
                                <img src = '../../Assets/Images/download-icon.png' alt = 'icon' />
                            </div>
                            {exportOptions? <div  className = 'export__options'>
                                <div onClick = {() => {} }>
                                    PDF
                                </div>
                                <div>
                                    XLS
                                </div>
                            </div> : null}
                        </div>
                    </div>
                    <div className = 'transaction__header__search-options'>
                        <div className = 'select-wrap'>
                            <Select
                                selectClass = 'select-mini' 
                                listClass = 'selectLIst-mini'
                                data = { userAccounts } 
                                placeholder = 'Select Account'
                                selected = { selectedAccount.accountNumber }
                                icon = { <Icon iconUrl = { ComonFn.setLogoByAccountType(selectedAccount.type) }/> }
                                display ={(element, setVisible) => (
                                <SelectList  
                                    key={ element.accountNumber } 
                                    clicked={() => { setSelectedAccount(element); setVisible(false) }} >
                                        <Icon iconUrl = { ComonFn.setLogoByAccountType(element.type) }/>{ element.accountNumber } 
                                </SelectList>)} 
                            />
                        </div>
                        <Select
                            selectClass = 'select-mini' 
                            data={ allUserCurrencies } 
                            placeholder = 'Select Currency'
                            selected = { selectedCurrency.title }
                            display = {(element, setVisible) => (
                            <SelectList  
                                listClass = 'selectLIst-mini' 
                                key={element.title} 
                                clicked={() => { setSelectedCurrency(element); setVisible(false) }} >
                                    {element.value + '/' + element.title} 
                            </SelectList>)} 
                        />
                    </div>
                </div>
                <div className = 'transaction__body'>
                    { searchInTransaction.map((transaction, index) => (<TransactionDetail 
                            showlong
                            key = { index } 
                            transaction = { transaction }  
                            clicked = {() =>   {handleTransactionDetailView(transaction, setSelectedTransaction, navigate); setDetailVisible(true)}}
                            />))}
                    <Button buttonClass = 'loadmore' clicked = { handleLoadMoreTransactions }>მეტი</Button>        
                </div>
            </div>
            </Layout>
        );
}


Transaction.propTypes = {

};

export default Transaction;