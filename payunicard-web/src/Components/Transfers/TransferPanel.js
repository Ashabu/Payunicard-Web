import React, {Fragment, useEffect, useState, useContext} from 'react';
import './transfer.scss';
import { Button, AppInput, SidePanel } from '../UI/UiComponents';
import PropTypes from 'prop-types';
import SelectAccount from './../SelectAccount/SelectAccount';
import { Context } from '../../Context/AppContext';
import { formatNumber } from '../../Services/CommonFunctions';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import ConversionPanel from './ConversionPanel';




const TransferPanel = (props) => {
    const { state, setGlobalState } = useContext(Context);
    const { allUserCurrencies } = state;


    const { tabvisible, closeTransferPanel, templateData, type, step, onTransfer } = props;


    const [ accoutFrom, setAccountFrom ] = useState({});
    const [ accoutTo, setAccountTo ] = useState({});
    const [ toAccountNumber, setToAccountNumber ] = useState('GE83TB7785445064300016');
    const [ beneficiaryName, setBeneficiaryName] = useState('ავთანდილ შაბურშვილი');
    const [ transferAmount, setTransferAmount ] = useState('10');
    const [ transferCurrency, setTransferCurrency ] = useState({});
    const [ transferDescription, setTransferDescription ] = useState('სატესტო გადარიცხვა');
    const [ conversionData, setConversionData ] = useState(null);


    //=================================================
    const [ currency, setCurrency ] = useState();

    

    useEffect(() => {
        if(templateData !== undefined) {
            setToAccountNumber(templateData.beneficiaryAccountNumber || templateData.toAccountNumber);
            setBeneficiaryName(templateData.toCustomerName || templateData.beneficiaryName);
            setTransferAmount(templateData.amount);
            setTransferDescription(templateData.description)
        }
    }, [templateData]);

    useEffect(() => {
        setCurrency(allUserCurrencies);
    }, [allUserCurrencies]);

    
    const selectAccountFrom = (account) => {
        if(Array.isArray(account)){
            account = account[0];
        }
        setAccountFrom(account);
    }

    const selectAccountTo = (account) => {
        setAccountTo(account)
    }

    const selectCurreny = (currency) => {
        setTransferCurrency(currency);
    }


    const getConversionData = (data) => {
        setConversionData(data);
    }


    const getTransferData = () => {
        let transferData = {};
        if(conversionData) {
            transferData = {
                toAccountNumber: accoutTo.accountNumber,
                fromAccountNumber: accoutFrom.accountNumber,
                nomination: transferDescription,
                ...conversionData
            }
        } else {
            transferData = {
                amount: transferAmount,
                toAccountNumber: accoutTo.accountNumber || toAccountNumber ,
                fromAccountNumber: accoutFrom.accountNumber,
                beneficiaryName: beneficiaryName,
                nomination: transferDescription,
                ccy: transferCurrency.key
            }
        }
        onTransfer(transferData);
    }



    let ToAcountNumber = (
        <AppInput className = 'AppInput' value = { toAccountNumber } onChange = {(e) => setToAccountNumber(e.target.value)} />
    );

    if(type === 'BetweenAccounts' || type === 'Conversion') {
        ToAcountNumber = (
            <Fragment>
                <p>სად</p>
                <SelectAccount account = { selectAccountTo } icon choseDisabled = {type === 'Conversion' ? null : accoutFrom.accountNumber }/>
            </Fragment>
        )
    }
    

    let BeneficiaryDetails = null;

    if(type === 'ToBank' || type === 'ToWallet') {
        BeneficiaryDetails = (
            <Fragment>
                <p>მიმღების სახელი</p>
                <AppInput className = 'AppInput' value = { beneficiaryName} onChange = {(e) => setBeneficiaryName(e.target.value)}/>
            </Fragment>
        )
    }

    let AmountDetails = ( 
        <Fragment>
            <p>თანხის ოდენობა</p>
            <div style = {{display: 'flex'}}>
                <AppInput className = 'AppInput' value = { transferAmount } onChange = {(e) => setTransferAmount(e.target.value)}/>
                <SelectCurrency currency = { selectCurreny } />
            </div>  
        </Fragment>
    )
    
    if(type === 'Conversion') {
        AmountDetails = (
            <ConversionPanel usercurrency = { currency } callBack = { getConversionData }/>
        )
    }


    let TransferDetails = null;
    let BeneficiaryName = null;

    let TransferAmount = (
        <Fragment>
            <div className = 'tr-deatils-row'>
                <span>Amount:</span>
                <span>{ formatNumber(transferAmount)} ₾</span>
            </div>
        </Fragment>
    )

    if(type === 'Conversion') {
        
        TransferDetails = (
            <Fragment>
                <div className = 'tr-deatils-row'>
                    <span>Sold Amount::</span>
                    <span>100.00 ₾</span>
                </div>
                <div className = 'tr-deatils-row'>
                    <span>Bought Amount:</span>
                    <span>28.67 $</span>
                </div>
                <div className = 'tr-deatils-row'>
                    <span>Exchange Rate:</span>
                    <span>1 $ = 3.487 ₾</span>
                </div>
            </Fragment>
        )
    }

    if(type ==='ToBank' || type === 'ToWallet' ) {
        BeneficiaryName = (
            <Fragment>
                <div className = 'tr-deatils-row'>
                    <span>Recipient name:</span>
                    <span>ავთანდილ შაბურიშვილი</span>
                </div>
            </Fragment>
        )
    }


    let TransferStep = null;

    if(step === 0) {
        TransferStep = (
            <div>
                <p>საიდან</p>
                <SelectAccount 
                    account = { selectAccountFrom } 
                    icon 
                    choseDisabled = { type === 'Conversion' ? null : accoutTo.accountNumber } 
                    current = { templateData?.forFromExternalAccountId || templateData?.forFromAccountId }/>
                { ToAcountNumber }
                { BeneficiaryDetails }
                { AmountDetails }
                <p>დანიშნულება</p>
                <AppInput className = 'AppInput' value = { transferDescription} onChange = {(e) => setTransferDescription(e.target.value)}/> 
                <Button buttonClass = 'unicard-btn green' clicked = { getTransferData }>გადახდა</Button>
            </div>      
        )
    } else {
        TransferStep = (
            <div className = 'tr-success'>
                <div className = 'success-header'>
                    <img src = '../../Assets/Images/alert_green.png' alt = 'icon' />
                    <span>Transaction Successful</span>
                </div>
                <div className = 'success-body'>
                    <div className = 'tr-deatils-row'>
                        <span>From:</span>
                        <span>{ accoutFrom.accountNumber }{ accoutFrom.mAskedCard }</span>
                    </div>
                    <div className = 'tr-deatils-row'>
                        <span>To:</span>
                        <span>{accoutTo.accountNumber || toAccountNumber}{ accoutTo.mAskedCard }</span>
                    </div>
                    { BeneficiaryName }

                    { TransferDetails || TransferAmount }
                </div>
                <div className = 'success-footer'>
                    <img src = '../../Assets/Images/save-template.svg' alt= 'icon' onClick = { props.onSaveTemplate}/>
                    <span>Save As Template</span>
                </div>
               
                <Button buttonClass = 'unicard-btn green' clicked = { closeTransferPanel }>დახურვა</Button>

            </div>
        )
    }

   
    

    return (
        <SidePanel
            visible = { tabvisible }
            closePanel = { closeTransferPanel }>
        { TransferStep }    
            

           
        </SidePanel>
    );
}

TransferPanel.propTypes = {
    
};

export default TransferPanel;