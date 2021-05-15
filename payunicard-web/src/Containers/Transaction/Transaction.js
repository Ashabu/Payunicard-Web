import React, { Component } from 'react';
import './transaction.scss';
import  { GlobalStore, Store } from '../../Contexsts/GlobalContext'
import PropTypes from 'prop-types';
import Calendar from '../../Components/Calendar/Calendar';
import Select from '../../Components/UI/Select/Select';
import Selectlist from '../../Components/HOC/SelectList/SelectLIst';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';


class Transaction extends Component {


    static contextType = GlobalStore;
    state = {
        fromDate: '',
        toDate: '',
        search: '',
        statements: [],
        selected: {}
    }
   

    componentDidMount() {
        this.setState({statements: Store.userStatements})
        
    }

    


    handleDate = (data) => {
        if(data.val === 'From') {
            this.setState({fromDate: data.fromDate})
        } else {
            this.setState({toDate: data.toDate})
        }

    }
   

    render() {
        console.log(this.state.selected)
        return (
            <GlobalStore.Consumer>{(Store) =>
            <div className = 'transaction'>
                <div className = 'transaction__header'>
                    <Calendar fromDate = {this.state.fromDate} toDate = {this.state.toDate} setDate = {this.handleDate}/>
                    <input type = 'text' value = {this.state.search} onChange = {(e) => this.setState({search: e.target.value})}/>
                    <Select 
                            
                                data={Store.userAccounts} 
                                placeholder = 'Please Select'
                                selected = {this.state.selected.accountNumber}
                                render = {(element, setVisible) => (
                                <Selectlist  
                                    listClass = 'selectLIst' 
                                    key={element.accountNumber} 
                                    clicked={() => {this.setState({selected: element, }); setVisible(false);}} >
                                         {element.accountNumber} 
                                </Selectlist>
                            )}/>
                </div>
                <div className = 'transaction__body'>
                {this.state.statements.map((transaction, index)=> (<TransactionDetail transaction = {transaction} key ={index}/>))}
                </div>
            </div>}
            </GlobalStore.Consumer>
        );
    }
}

Transaction.propTypes = {

};

export default Transaction;