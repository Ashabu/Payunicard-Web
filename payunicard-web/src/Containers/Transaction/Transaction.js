import React, { Component } from 'react';
import './transaction.scss';
import PropTypes from 'prop-types';
import  { GlobalStore, Store } from '../../Contexsts/GlobalContext';
import User from '../../Services/API/UserServices';
import ComonFn from '../../Services/CommonFunctions';
import Exp from '../../Services/ExportService';
import { Backdrop, Calendar, Icon, Select, SelectList, Search, SidePanel } from '../../Components/UI/UiComponents';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';


class Transaction extends Component {


    static contextType = GlobalStore;
    state = {
        fromDate: '',
        toDate: '',
        transactions : [],
        searchInTransaction: [],
        selected: {},
        selectedAccount: {},
        selectedCurrency: {},
        detailVisible: false,
        selectedTransaction: {},
        exportOptions: false
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
        this.setState({searchInTransaction: Store.userStatements})
        this.getTransactions();
        this.setLastMonthInterval();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }


    handleClickOutside = (e) => {
        if(this.state.exportOptions && e.path[1].className !== 'export__options') {
            this.setState({exportOptions: false});
            console.log(e.path)
        }
    }
  


   
    setLastMonthInterval = () => {
        let curDate = new Date();
        let cMonth = ("0" + (curDate.getMonth() + 1)).slice(-2);
        let cDay = ("0" + curDate.getDate()).slice(-2);
        let prevMonth = new Date();
        let prevDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);    
        let pMonth  = ("0" + (prevDate.getMonth() + 1)).slice(-2);
        let pDay = cDay;
        this.setState({fromDate: [prevDate.getFullYear(), pMonth, pDay].join("-"), toDate: [curDate.getFullYear(), cMonth, cDay].join("-")})
        console.log('from =>', this.state.fromDate, 'to => ', this.state.toDate)
    }
    

    getTransactions = async () => {
        if(Store.userStatements.length > 0) {
            this.setState({transactions: Store.userStatements})
            return;
        } else {    
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
                    tr = res.data.data.statements;
                    Store.setUserStatements([...blockedtr, ...tr])
                    this.setState({transactions: [...blockedtr, ...tr], searchInTransaction:[...blockedtr, ...tr], isInitialized: true})

                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    
    handleSearch = (value) => {
        let transactions = this.state.transactions;
        let filteredTransactions = [...transactions].filter(tr => {
            return tr.merchantDescription?.toLowerCase().match(value.toLowerCase()) || tr.description?.toLowerCase().match(value.toLowerCase()); 
        })
        if (value === '') {
            this.setState({searchInTransaction: transactions})
        } else {
            this.setState({searchInTransaction: filteredTransactions})
        }
    }


    handleDate = (data) => {
        if(data.val === 'From') {
            this.setState({fromDate: data.fromDate})
        } else {
            this.setState({toDate: data.toDate})
        }

    }

    handleTransactionDetailView = (transaction) => {
        if(transaction.tranID){ 
            User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
                if(res.data.ok) {
                    this.setState({selectedTransaction: res.data.data})
                } else {
                    console.log('error')
                }
            }).catch(error => {
                console.log(error)
            })
            this.props.history.push({
                pathname: '/Transactions/TransactionDetail',
                search: `?tranId=${transaction.tranID}`,
            })
        } else {
            this.setState({selectedTransaction: transaction})
            this.props.history.push({
                pathname: '/Transactions/TransactionDetail',
                search: `?cardNumber=${transaction.cardNumber}`,
            })
        }
        
    }


    handleExportStatementsAsPDF = () => {
        let data = {
            accountNumber: this.state.selectedAccount.accountNumber,
            startDate: this.state.fromDate,
            endDate: this.state.toDate
        }
        Exp.exportStatementsInPDF(data)        
    }

   

    render() {
        console.log(this.wrapperRef)
        return (
            <GlobalStore.Consumer>{(store) =>
                <React.Fragment>
                <Backdrop show = {this.state.detailVisible} hide = {()=> {this.props.history.goBack(); this.setState({detailVisible: false})}}/>
                <SidePanel
                    stepBack 
                    visible = {this.state.detailVisible}
                    closePanel = {()=> {this.setState({detailVisible: false}); this.props.history.goBack()}}>
                        <TransactionDetailView transaction = {this.state.selectedTransaction}/>
                    </SidePanel>
            <div className = 'transaction'>
                <div className = 'transaction__header'>
                    <button onClick = {() => this.props.history.push('/Dashboard')}>go dashboard</button>
                    <Calendar fromDate = {this.state.fromDate} toDate = {this.state.toDate} setDate = {this.handleDate}/>
                    <Search searchValue = {this.state.searchValue} onsearch = {this.handleSearch}/>
                    <Select
                        selectClass = 'select-mini' 
                        data={store.userAccounts} 
                        placeholder = 'Select Account'
                        selected = {this.state.selectedAccount.accountNumber}
                        icon = {<Icon iconUrl = {ComonFn.setLogoByAccountType(this.state.selectedAccount.type)}/>}
                        display ={(element, setVisible) => (
                        <SelectList  
                            listClass = 'selectLIst-mini' 
                            key={element.accountNumber} 
                            clicked={() => {this.setState({selectedAccount: element, }); setVisible(false);}} >
                                 <Icon iconUrl = {ComonFn.setLogoByAccountType(element.type)}/>{element.accountNumber} 
                        </SelectList>)} 
                    />
                    <Select
                        selectClass = 'select-mini' 
                        data={store.allUserCurrencies} 
                        placeholder = 'Select Currency'
                        selected = {this.state.selectedCurrency.title }
                        display ={(element, setVisible) => (
                        <SelectList  
                            listClass = 'selectLIst-mini' 
                            key={element.title} 
                            clicked={() => {this.setState({selectedCurrency: element, }); setVisible(false);}} >
                                 {element.value + '/' + element.title} 
                        </SelectList>)} 
                    />
                    <div className = 'export'>
                        <div className = 'export__icon'  onClick = {() => this.setState({exportOptions: !this.state.exportOptions})} >
                            <img src = '../../Assets/Images/download-icon.png' alt = 'icon' />
                        </div>
                        {this.state.exportOptions? <div  className = 'export__options'>
                            <div onClick = {this.handleExportStatementsAsPDF}>
                                PDF
                            </div>
                            <div>
                                XLS
                            </div>
                        </div> : null}
                    </div>
                </div>
                <div className = 'transaction__body'>
                    <p>ტრანზაქციები</p>
                    {this.state.searchInTransaction.map((transaction, index)=> (<TransactionDetail 
                            showlong
                            key = {index} 
                            transaction = {transaction}  
                            clicked = {() =>  {this.handleTransactionDetailView(transaction); this.setState({detailVisible: true})}}
                            />))}
                </div>
            </div>
            </React.Fragment> }
            </GlobalStore.Consumer>
        );
    }
}

Transaction.propTypes = {

};

export default Transaction;