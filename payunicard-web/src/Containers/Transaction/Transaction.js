import React, { Component } from 'react';
import './transaction.scss';
import  { GlobalStore, Store } from '../../Contexsts/GlobalContext';
import User from '../../Services/API/UserServices';
import PropTypes from 'prop-types';
import Calendar from '../../Components/Calendar/Calendar';
import Select from '../../Components/UI/Select/Select';
import Selectlist from '../../Components/HOC/SelectList/SelectLIst';
import SidePanel from '../../Components/UI/SidePanel/SidePanel';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';



class Transaction extends Component {


    static contextType = GlobalStore;
    state = {
        fromDate: '',
        toDate: '',
        search: '',
        statements: [],
        selected: {},
        detailVisible: false,
        selectedTransaction: {},
    }
   

    componentDidMount() {
        this.setState({statements: Store.userStatements})
        this.getTransactions();
    }

    getTransactions = async () => {
        if(Store.userStatements.length > 0) {
            this.setState({statements: Store.userStatements})
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
                    tr = res.data.data.statements
                    Store.setUserStatements([...blockedtr, ...tr])
                    this.setState({statements: tr, isInitialized: true})

                }
            }).catch(error => {
                console.log(error)
            })
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

   

    render() {
        console.log(this.state.selected)
        return (
            <GlobalStore.Consumer>{(Store) =>
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
                    <input type = 'text' value = {this.state.search} onChange = {(e) => this.setState({search: e.target.value})}/>
                    <Select
                        selectClass = 'select-mini' 
                        data={Store.userAccounts} 
                        placeholder = 'Please Select'
                        selected = {this.state.selected.accountNumber}
                        display ={(element, setVisible) => (
                        <Selectlist  
                            listClass = 'selectLIst' 
                            key={element.accountNumber} 
                            clicked={() => {this.setState({selected: element, }); setVisible(false);}} >
                                 {element.accountNumber} 
                        </Selectlist>)}
                    />
                </div>
                <div className = 'transaction__body'>
                    <p>ტრანზაქციები</p>
                    {Store.userStatements.map((transaction, index)=> (<TransactionDetail 
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