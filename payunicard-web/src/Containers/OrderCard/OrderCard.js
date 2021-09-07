import React, { useState, useContext } from 'react';
import { Context } from '../../Context/AppContext';
import './orderCard.scss';
import { SidePanel } from '../../Components/UI/UiComponents';
import SelectCardType from '../../Components/OrderCard/SelectCardType';
import SwitchTab from '../../Components/OrderCard/SwitchTab';
import SelectPackage from '../../Components/Selects/SelectPackage';

const OrderCard = () => {
    const { state } = useContext(Context);
    const { packages } = state;
    const [step, setStep] = useState(0);
    const [isAnualPrice, setIsAnualPrice] = useState(false)

    let OrderCardStep = null;

    if (step === 0) {
        OrderCardStep = <SelectCardType />

    }
    return (
        <SidePanel visible={false}>
            <SwitchTab anualPrice={isAnualPrice} onClick={() => setIsAnualPrice(!isAnualPrice)} />
            <SelectPackage packages={packages} placeholder='აირჩიეთ ტარიფი' anualPrice={isAnualPrice} />
            {OrderCardStep}
            <button onClick={() => setStep(step + 1)}>შემდეგი</button>
        </SidePanel>
    );
};

export default OrderCard;