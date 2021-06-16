import React, {useEffect, useState, useContext} from 'react';
import './transfer.scss';
import { Button, Input, SidePanel } from '../UI/UiComponents';
import PropTypes from 'prop-types';
import SelectAccount from './../SelectAccount/SelectAccount';
import { Context } from '../../Context/AppContext';




const TransferPanel = (props) => {
    const { state, setGlobalState } = useContext(Context);
    const { userAccounts } = state;


    const { tabvisible, closeTransferPanel, templateData } = props;


    const [ accoutFrom, setAccountFrom ] = useState({});
    const [ accoutTo, setAccountTo ] = useState({});
    const [ toAccountNumber, setToAccountNumber ] = useState('');
    const [ beneficiaryName, setBeneficiaryName] = useState('');
    const [ transferAmount, setTransferAmount ] = useState('');
    const [ transferDescription, setTransferDescription ] = useState('');




    useEffect(() => {
        if(templateData !== undefined) {
            setToAccountNumber(templateData.beneficiaryAccountNumber || templateData.toAccountNumber);
            setBeneficiaryName(templateData.toCustomerName || templateData.beneficiaryName);
            setTransferAmount(templateData.amount);
            setTransferDescription(templateData.description)
        }
    }, [templateData])

    console.log('toCustomerName',templateData?.toCustomerName, 'beneficiaryName', templateData?.beneficiaryName, beneficiaryName)

    
    const selectAccountFrom = (account) => {
        setAccountFrom(account);
        console.log(account)
    }
    const selectAccountTo = (account) => {
        setAccountTo(account)
    }

    const getTransferData = () => {
        let transferData = {
            amount: transferAmount,
            toAccountNumber: toAccountNumber,
            fromAccountNumber: accoutFrom.accountNumber,
            beneficiaryName: beneficiaryName,
            nomination: transferDescription,
            ccy: "GEL"

        }
        props.onTransfer(transferData);
    }

    

    return (
        <SidePanel
            visible = { tabvisible }
            closePanel = { closeTransferPanel }>
        <div>
            <p>საიდან</p>
            <SelectAccount account = { selectAccountFrom } icon current = { templateData?.forFromExternalAccountId || templateData?.forFromAccountId }/>
            <p>სად</p>
            <Input className = 'Input' value = { toAccountNumber } onChange = {(e) => setToAccountNumber(e.target.value)} />
            <p>მიმღების სახელი</p>
            <Input className = 'Input' value = { beneficiaryName} onChange = {(e) => setBeneficiaryName(e.target.value)}/>
            <p>თანხის ოდენობა</p>
            <div>
                <Input className = 'Input' value = { transferAmount } onChange = {(e) => setTransferAmount(e.target.value)}/>
                <div></div>
            </div>  
            <p>დანიშნულება</p>
            <Input className = 'Input' value = { transferDescription} onChange = {(e) => setTransferDescription(e.target.value)}/> 
        </div>      
            <Button clicked = { getTransferData }>გადახდა</Button>

           
        </SidePanel>
    );
}

TransferPanel.propTypes = {
    
};

export default TransferPanel;