/* eslint-disable no-undef */
import React, {Component} from 'react';
import './dashboard.scss';
import GlobalContext, {contextState}  from '../../Contexsts/GlobalContext';
import User from '../../Services/API/UserServices';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import SidePanel from '../../Components/UI/SidePanel/SidePanel';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';



class Dashboard extends Component {

    static contextType = GlobalContext;

    

    state = {
        isInitialized: false,
        transactions: [],
        panelVisible: false,
        selectedTransaction: {}
    }

    componentDidMount() {
        this.getTransactions();
    }

  

    getTransactions = async () => {
        
       User.GetUserAccountStatements().then(res => {
            if(res.data.ok) {
                contextState.setUserStatements(res.data.data.statements)
                this.setState({isInitialized: true})
            }
        }).catch(error => {
            console.log(error)
        })
    }
    
   

    tranDetail = (transaction) => {
        // let trData = new FormData();
        // trData.append('tranId', transaction.tranID) 
        User.GetTransactionDetails({tranId: transaction.tranID}).then(res => {
            if(res.data.ok) {
                this.setState({selectedTransaction: res.data.data, panelVisible: true})
                debugger
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
        
    }


    render() {
        if(!this.state.isInitialized) return null;
        
        return (
            <GlobalContext.Consumer>
          {(context)=>  <div >
              <Backdrop show = {this.state.panelVisible} hide = {()=> {this.setState({panelVisible: false}); this.props.history.goBack ()}}/>
                <SidePanel
                    stepBack 
                    visible = {this.state.panelVisible}
                    closePanel = {()=> {this.setState({panelVisible: false}); this.props.history.goBack ()}} 
                   >
                        <TransactionDetailView transaction = {this.state.selectedTransaction}/>
                    </SidePanel>
                <div style ={{maxWidth: 485}}>
                    {context.userStatements.map(transaction =>(<TransactionDetail key = {transaction.tranID} transaction = {transaction} clicked = {() =>  this.tranDetail(transaction)}/>))}
                </div>
                <div>
                    
                </div>
            </div>}
            </GlobalContext.Consumer>
        );
    }
}

export default Dashboard;