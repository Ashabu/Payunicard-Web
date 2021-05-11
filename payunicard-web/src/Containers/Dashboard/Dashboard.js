/* eslint-disable no-undef */
import React, {Component} from 'react';
import axios from 'axios'
import './dashboard.scss';
import OtpBox from '../../Components/UI/Otp-Box/Otp-Box';
import TransactionDetails from '../../Components/TransactionDetails/TransactionDetails';



class Dashboard extends Component {

    state = {
        transactions: [],
    }

    componentDidMount() {
        this.getTransactions();
    }

    getTransactions = async () => {
        await axios.post(`${globalConfig.api_URL}/user/GetUserAccountsStatement`,{
            headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
        }).then(res => {
            if(res.data.ok) {
                this.setState({transactions: res.data.data.statements})
                console.log(this.state.transactions)
            }
        })
    }
    

    tranDetail = (transaction) => {
        console.log(transaction)
        this.props.history.push({
            pathname: '/Dashboard/TransactionDetails',
            search: `?tranId=${transaction.tranID}`,
            
          })
    }

    render() {
        
        
        return (
            <div style ={{maxWidth: 485}}>
            {this.state.transactions.map(transaction =>(<TransactionDetails key = {transaction.tranID} transaction = {transaction} clicked = {() => this.tranDetail(transaction)}/>))}
                

            </div>
        );
    }
}

export default Dashboard;