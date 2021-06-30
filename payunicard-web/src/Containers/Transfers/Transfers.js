import React, {useState, useEffect, useContext} from 'react';
import './transfers.scss';
import { Context } from '../../Context/AppContext.js';
import { formatNumber, search } from '../../Services/CommonFunctions'; 
import { Backdrop, OTP, Search, SidePanel, Widget } from '../../Components/UI/UiComponents';

import { Otp, Transaction, User } from '../../Services/API/APIS';
import { handleTransactionDetailView } from '../../Providers/TransactionProvider';
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';
import PropTypes from 'prop-types';
import TransferTemplate from './../../Components/Transfers/TransferTemplate';
import TransferPanel from './../../Components/Transfers/TransferPanel';
import ConversionPanel from '../../Components/Transfers/ConversionPanel';
import TransactionDetail from '../../Components/TransactionDetails/TransactionDetail';
import TransactionDetailView from '../../Components/TransactionDetailView/TransactionDetailView';

const Transfers = (props) => {

    const { state, setGlobalValue } = useContext(Context);
    const { transferTemplates, allUserCurrencies } = state;
    const {} = props;

    const [ tramsferStatements, setTransferStatements ] = useState([]);
    const [ detailVisible, setDetailVisible ] = useState(false);
    const [ selectedTransaction, setSelectedTransaction ] = useState({});

    const [ templates, setTemplates ] = useState([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState(undefined)
    const [ transferPanelVisible, setTransferPanelVisible ] = useState(false);
    const [ transferStep, setTransferStep ] = useState(0);
    const [ transferType, setTransferType ] = useState('');
    const [ transferData, setTransferData ] = useState(null);
    const [ oneTimePasscode, setOneTimePasscode ] = useState('');

    //------------------------------------------------------------
    const [ otpWindowVisible,  setOtpWindowVisible ] = useState(false);
    const [ currency, setCurrency ] = useState(null);


    useEffect(() => {
        setCurrency(allUserCurrencies);
        setTemplates(transferTemplates)
    }, [transferTemplates, allUserCurrencies]);

    useEffect(() => {
        getTransferStaements();
    }, [tramsferStatements])

    const getTransferStaements = () => {
        let data = {
            rowCount: 10,
            opClass: 'P2B',
            opExclude: true
            
        }
        
        User.GetUserAccountStatements(data).then(res => {
            
            if(res.data.ok){
                setTransferStatements(res.data.data.statements)
            }
        }).catch (error => { console.log(error) });
    }

    const closeTransferPanel = () => {
        setTransferPanelVisible(false);
        setSelectedTemplate(undefined);
        setTransferStep(0);
        
    } 

    const openTransferPanel = (template) => {
        setTransferPanelVisible(true);
        setSelectedTemplate(template);
    }

    const searchTemplates = (value) => {
        let transTemplates = transferTemplates;
        let searchInTemplates = search(transTemplates, ['templName'], value);
        if (value == "") {
            setTemplates(transferTemplates);
        } else {
            setTemplates(searchInTemplates);
        }
    }

    const startTransfer = (data) => {
        if(transferType === 'BetweenAccounts' || transferType === 'Conversion') {
            makeTransfer(data);
            
        } else {
            setTransferData(data);
            setOtpWindowVisible(true);
            Otp.PhoneOtpByUser({userName: 'a.shaburishvili'}); 
        }
        
    }

    const makeTransfer = (data) => {
        if(transferData) {
            data = {...transferData, otp: oneTimePasscode};
        }
        
        Transaction.makeTransaction(transferType, data).then(res => {
            if(res.data.ok) {
                setOtpWindowVisible(false);
                setTransferStep(1);
            }
        })
    }

    const getOtpValue = (value) => {
        setOneTimePasscode(value);
    }





    return (
        <AuthorizedLayout pageName = "ჩემი გადარიცხვები">
            <Backdrop show = { transferPanelVisible || detailVisible } hide = { closeTransferPanel }/>
            <OTP submitAction = {()=> makeTransfer() } getOtpValue = { getOtpValue } otpVisible = { otpWindowVisible} closeOtpWindow = {() => setOtpWindowVisible(false)}/>
            <TransferPanel 
                templateData = { selectedTemplate }
                tabvisible = { transferPanelVisible }
                step = { transferStep }
                closeTransferPanel = { closeTransferPanel }
                onTransfer = { startTransfer }
                type = { transferType }/>
            <div style = {{height: 1000, marginLeft: 300}}>

            <SidePanel
                visible = { detailVisible }
                closePanel = {() => { setDetailVisible(false); history.goBack() }}>
                    <TransactionDetailView transaction = { selectedTransaction }/>
            </SidePanel>    
                
                
                <Widget>
                    <div style = {{display: 'flex', flexWrap:'wrap', width: '51%'}}>
                    <div style = {{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <p>შაბლონები</p>
                        <Search onsearch = { searchTemplates }/>
                    </div>
                    {templates?.map(t => (<TransferTemplate key = { t.templateId } template = { t }  clicked = {()=> openTransferPanel(t) }/>)) }
                    </div>

                </Widget>
                <div className = 'tr-services'>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('BetweenAccounts')}}>
                         <img src = '../../Assets/Images/TransferImg/betweenOwnAccounts.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('Conversion')}}>
                         <img src = '../../Assets/Images/TransferImg/conversion.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('ToWallet')}}>
                         <img src = '../../Assets/Images/TransferImg/toUniwallet.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('ToBank')}}>
                         <img src = '../../Assets/Images/TransferImg/toBank.png' alt = 'icon' />   
                    </div>
                </div>
                <Widget>
                    <div>
                        <p>ბოლო ტრანზაქციები</p>
                    </div>
                    {tramsferStatements.map((transaction, index) => (
                        <TransactionDetail key = { index } 
                            transaction = { transaction }
                            clicked = {() =>   {handleTransactionDetailView(transaction, setSelectedTransaction, navigate); setDetailVisible(true)}}/>
                        ))}
                </Widget>   
                  
            </div>
        </AuthorizedLayout>
    )
}

Transfers.propTypes = {

}

export default Transfers
