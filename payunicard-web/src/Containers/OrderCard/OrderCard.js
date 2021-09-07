import React, {useState} from 'react';
import './orderCard.scss';
import { SidePanel } from '../../Components/UI/UiComponents';
import SelectCardType from '../../Components/OrderCard/SelectCardType';

const OrderCard = () => {

    const [step, setStep] = useState(0);
    
    let OrderCardStep = null;

    if(step === 0) {
        OrderCardStep = <SelectCardType/>
        
    }
    return (
        <SidePanel visible = {false}>
            {OrderCardStep}
            <button onClick = {()=> setStep(step+1)}>შემდეგი</button>
        </SidePanel>
    );
};

export default OrderCard;