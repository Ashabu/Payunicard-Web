import React, {useState, useEffect, useContext} from 'react';
import './transfers.scss';
import { Context } from '../../Context/AppContext.js';
import { formatNumber, } from '../../Services/CommonFunctions'; 
import { Backdrop, Search, Widget } from '../../Components/UI/UiComponents';
import { Otp, Transaction } from '../../Services/API/APIS';
import Layout from '../../Containers/Layout/Layout';
import PropTypes from 'prop-types';
import TransferTemplate from './../../Components/Transfers/TransferTemplate';
import TransferPanel from './../../Components/Transfers/TransferPanel';

const Transfers = (props) => {

    const { state, setGlobalValue } = useContext(Context);
    const { transferTemplates } = state;
    const {} = props;

    const [ templates, setTemplates ] = useState([]);
    const [ selectedTemplate, setSelectedTemplate ] = useState(undefined)
    const [ transferPanelVisible, setTransferPanelVisible ] = useState(false);
    const [ transferType, setTransferType ] = useState('');

    useEffect(() => {
        setTemplates(transferTemplates)
    }, [transferTemplates]);

    const closeTransferPanel = () => {
        setSelectedTemplate(undefined);
        setTransferPanelVisible(false);
        
    } 

    const openTransferPanel = (template) => {
        setTransferPanelVisible(true);
        setSelectedTemplate(template);
    }

    const searchTemplates = (value) => {
        let transTemplates = transferTemplates;

        let searchInTemplates = [...transTemplates].filter(t => {
            return t.templName?.toLowerCase().match(value.toLowerCase()); 
        })
        if (value == "") {
            setTemplates(transferTemplates);
        } else {
            setTemplates(searchInTemplates);
        }
    }

    const startTransfer = (data) => {
    
        // Otp.PhoneOtpByUser({userName: 'a.shaburishvili'}); return;

        Transaction.startTransaction({...data, otp: '6933'}).then(res => {
            console.log(res.data)
        })
        console.log(data)
    }



    return (
        <Layout>
            <Backdrop show = { transferPanelVisible } hide = { closeTransferPanel }/>
            <TransferPanel 
            templateData = { selectedTemplate }
            tabvisible = { transferPanelVisible }
            closeTransferPanel = { closeTransferPanel }
            onTransfer = { startTransfer } />
            <div style = {{height: 1000, marginLeft: 300}}>
                
                
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
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('ToBank')}}>
                         <img src = '../../Assets/Images/TransferImg/betweenOwnAccounts.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('Conversion')}}>
                         <img src = '../../Assets/Images/TransferImg/conversion.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('ToWallet')}}>
                         <img src = '../../Assets/Images/TransferImg/toUniwallet.png' alt = 'icon' />   
                    </div>
                    <div className = 'tr-service' onClick = {() => {setTransferPanelVisible(true); setTransferType('BetweenAccounts')}}>
                         <img src = '../../Assets/Images/TransferImg/toBank.png' alt = 'icon' />   
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Transfers.propTypes = {

}

export default Transfers
