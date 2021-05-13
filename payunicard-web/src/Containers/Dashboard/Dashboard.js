/* eslint-disable no-undef */
import React, {Component} from 'react';
import GlobalContext, {contextState}  from '../../Contexsts/GlobalContext';
import User from '../../Services/API/UserServices';
import './dashboard.scss';
import TransactionDetail from '../../Components/TransactionDetail/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';
import SidePanel from '../../Components/UI/SidePanel/SidePanel';
import Button from '../../Components/UI/Button/Button'
import Backdrop from '../../Components/UI/Backdrop/Backdrop';



class Dashboard extends Component {

    static contextType = GlobalContext;

    

    state = {
        isInitialized: false,
        transactions: [],
        panelVisible: false,
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
        })
    }
    
   

    tranDetail = (transaction) => {
       
        this.setState({panelVisible: true})
        console.log(this.state.panelVisible)
        this.props.history.push({
            pathname: '/Dashboard/TransactionDetail',
            search: `?tranId=${transaction.tranID}`,
            
          })
        
    }


    render() {
        console.log(contextState)
        if(!this.state.isInitialized) return null;
        
        return (
            <GlobalContext.Consumer>
          {(context)=>  <div >
              <Backdrop show = {this.state.panelVisible} hide = {()=> this.setState({panelVisible: false})}/>
                <SidePanel
                    stepBack 
                    visible = {this.state.panelVisible}
                    closePanel = {()=> this.setState({panelVisible: false})} 
                    footer= {<Button/>} />
                <div style ={{maxWidth: 485}}>
                    {context.userStatements.map(transaction =>(<TransactionDetail key = {transaction.tranID} transaction = {transaction} clicked = {() => this.tranDetail(transaction)}/>))}
                </div>
                <div>
                    <TransactionDetailView/>
                </div>
            </div>}
            </GlobalContext.Consumer>
        );
    }
}

export default Dashboard;