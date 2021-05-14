/* eslint-disable no-undef */
import React, {Component} from 'react';
import './dashboard.scss';
import  { StoreConsumer, Store}  from '../../Contexsts/GlobalContext';
import User from '../../Services/API/UserServices';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import SidePanel from '../../Components/UI/SidePanel/SidePanel';
import Backdrop from '../../Components/UI/Backdrop/Backdrop';



class Dashboard extends Component {

    // static contextType = GlobalContext;

    

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
                this.setState({isInitialized: true})
                
            }
        }).catch(error => {
            console.log(error)
        })
    }
    
   

    tranDetail = (transaction) => {
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
          <StoreConsumer>
          {(context)=>  <div >
              <Backdrop show = {this.state.panelVisible} hide = {()=> {this.props.history.goBack(); this.setState({panelVisible: false})}}/>
                <SidePanel
                    stepBack 
                    visible = {this.state.panelVisible}
                    closePanel = {()=> {this.setState({panelVisible: false}); this.props.history.goBack()}} 
                   >
                        <TransactionDetailView transaction = {this.state.selectedTransaction}/>
                    </SidePanel>
                <div style ={{maxWidth: 485}}>
                    {context.userStatements.map((transaction, index) =>
                        (<TransactionDetail 
                            key = {index} 
                            transaction = {transaction}  
                            clicked = {() =>  {this.tranDetail(transaction); this.setState({panelVisible: true})}}
                            />))}
                </div>
                <div>
                    
                </div>
            </div>}
            </StoreConsumer>
        );
    }
}

export default Dashboard;