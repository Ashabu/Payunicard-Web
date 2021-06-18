import React, {Fragment, useEffect, useState, useContext} from 'react';
import './transfer.scss';
import { Button, Input, SidePanel } from '../UI/UiComponents';
import PropTypes from 'prop-types';
import SelectAccount from './../SelectAccount/SelectAccount';
import { Context } from '../../Context/AppContext';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import ConversionPanel from './ConversionPanel';




const TransferPanel = (props) => {
    const { state, setGlobalState } = useContext(Context);
    const { allUserCurrencies } = state;


    const { tabvisible, closeTransferPanel, templateData, type, step } = props;


    const [ accoutFrom, setAccountFrom ] = useState({});
    const [ accoutTo, setAccountTo ] = useState({});
    const [ toAccountNumber, setToAccountNumber ] = useState('GE83TB7785445064300016');
    const [ beneficiaryName, setBeneficiaryName] = useState('ავთანდილ შაბურშვილი');
    const [ transferAmount, setTransferAmount ] = useState('10');
    const [ transferCurrency, setTransferCurrency ] = useState({});
    const [ transferDescription, setTransferDescription ] = useState('სატესტო გადარიცხვა');


    //=================================================
    const [ currency, setCurrency ] = useState();

    const getConversionData = (data) => {
        console.log(data)
    }


    useEffect(() => {
        if(templateData !== undefined) {
            setToAccountNumber(templateData.beneficiaryAccountNumber || templateData.toAccountNumber);
            setBeneficiaryName(templateData.toCustomerName || templateData.beneficiaryName);
            setTransferAmount(templateData.amount);
            setTransferDescription(templateData.description)
        }
    }, [templateData])

    useEffect(() => {
        setCurrency(allUserCurrencies)
    }, [allUserCurrencies])

    
    const selectAccountFrom = (account) => {
        setAccountFrom(account);
        console.log(account)
    }

    const selectAccountTo = (account) => {
        setAccountTo(account)
    }

    const selectCurreny = (currency) => {
        setTransferCurrency(currency);
        console.log(transferCurrency)
    }

    const getTransferData = () => {
        let transferData = {
            amount: transferAmount,
            toAccountNumber: toAccountNumber || accoutTo.accountNumber,
            fromAccountNumber: accoutFrom.accountNumber,
            beneficiaryName: beneficiaryName,
            nomination: transferDescription,
            ccy: transferCurrency.key

        }
        props.onTransfer(transferData);
    }

    let ToAcountNumber = (<Input className = 'Input' value = { toAccountNumber } onChange = {(e) => setToAccountNumber(e.target.value)} />);

    if(type === 'BetweenAccounts' || type === 'Conversion') {
        ToAcountNumber = (
            <Fragment>
                <p>სად</p>
                <SelectAccount account = { selectAccountTo } icon choseDisabled = { accoutFrom.accountNumber }/>
            </Fragment>
        )
    }
    
    let BeneficiaryDetails = null;

    if(type === 'ToBank' || type === 'ToWallet') {
        BeneficiaryDetails = (
            <Fragment>
                <p>მიმღების სახელი</p>
                <Input className = 'Input' value = { beneficiaryName} onChange = {(e) => setBeneficiaryName(e.target.value)}/>
            </Fragment>
        )
    }

    let AmountDetails = ( 
        <Fragment>
            <p>თანხის ოდენობა</p>
            <div style = {{display: 'flex'}}>
                <Input className = 'Input' value = { transferAmount } onChange = {(e) => setTransferAmount(e.target.value)}/>
                <SelectCurrency currency = { selectCurreny } />
            </div>  
        </Fragment>
    )
    
    if(type === 'Conversion') {
        AmountDetails = (<ConversionPanel usercurrency = { currency } callBack = { getConversionData }/> )
    }














    let TransferStep = null;

    if(step === 0) {
        TransferStep = (
            <div>
                <p>საიდან</p>
                <SelectAccount account = { selectAccountFrom } icon choseDisabled = {  accoutTo.accountNumber } current = { templateData?.forFromExternalAccountId || templateData?.forFromAccountId }/>
                { ToAcountNumber }
                { BeneficiaryDetails }
                { AmountDetails }
                <p>დანიშნულება</p>
                <Input className = 'Input' value = { transferDescription} onChange = {(e) => setTransferDescription(e.target.value)}/> 
            </div>      
        )
    } else {
        TransferStep = (<div>გადარიცხვა წარმატებით დასრულა</div>)
    }


    return (
        <SidePanel
            visible = { tabvisible }
            closePanel = { closeTransferPanel }>
        { TransferStep }    
            <Button buttonClass = 'unicard-btn green' clicked = { getTransferData }>გადახდა</Button>

           
        </SidePanel>
    );
}

TransferPanel.propTypes = {
    
};

export default TransferPanel;