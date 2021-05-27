import React, {useContext, useState} from 'react';
import './payment.scss';
import { Context } from '../../Context/AppContext';
import { Button, Icon, Input, Select, SelectList } from '../UI/UiComponents';
import ComonFn from '../../Services/CommonFunctions';
import {Presentation } from '../../Services/API/APIS';
import PropTypes from 'prop-types';



const  FillPaymentData = (props) => {
    const { state } = useContext(Context);
    const { userAccounts } = state;

    const [ selectedAccount, setSelectedAccount] = useState({});
    const [ abonentCode, setAbonentCode ] = useState('');
    const [ costumerDebtData, setCostumerDebtData ] = useState([]);

    const { merchantdata } = props;


    const checkCostumerDebt = () => {
        let checkDetails = {
            forPaySPCode: merchantdata.forPaySPCode,
            forMerchantCode: merchantdata.forMerchantCode,
            forMerchantServiceCode: merchantdata.forMerchantServiceCode,
            serviceId: merchantdata.debtCode,
            abonentCode: abonentCode
        }

        Presentation.checkCostumerDebt(checkDetails).then(res => {
            if(res.ok) {
                setCostumerDebtData(res.Data.Structures);
            }
        })


    }


    
    
    return (
        <div style={{width: 570, height: '100%', border: '1px solid black', boxSizing: 'border-box', padding: 20}}>
            <div>
                <p>Please Choose a Card</p>
                <Select
                        data = { userAccounts } 
                        placeholder = 'Select Account'
                        selected = { selectedAccount.accountNumber }
                        icon = { <Icon iconUrl = { ComonFn.setLogoByAccountType(selectedAccount.type) }/> }
                        display ={(element, setVisible) => (
                        <SelectList  
                            key={ element.accountNumber } 
                            clicked={() => { setSelectedAccount(element); setVisible(false) }} >
                                <Icon iconUrl = { ComonFn.setLogoByAccountType(element.type) }/>{ element.accountNumber } 
                        </SelectList>)} 
                    />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: 300}}>

                </div>
                <div style = {{display: 'flex'}}>
                    <Input value = {abonentCode} onInput = {(e) => setAbonentCode(e.target.value)} />
                    {abonentCode !== ''? <Button clicked = {checkCostumerDebt}>შემომწმება</Button> : null}
                </div>
            </div>
        </div>
    )
}

FillPaymentData.propTypes = {

}

export default FillPaymentData
