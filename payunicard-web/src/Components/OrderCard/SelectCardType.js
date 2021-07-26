import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Presentation } from '../../Services/API/APIS';

const SelectCardType = props => {
    let currencies = [
        { key: 'GEL', value: '₾' },
        { key: 'USD', value: '$' },
        { key: 'EUR', value: '€' },

    ]

    useEffect(() => {
        GetCardTypes();
    }, [])
    const [tt, setTt] = useState(false);
    const [count, setCount] = useState(0);
    const [cardTypes, setCardTypes] = useState([]);

    const GetCardTypes = () => {
        Presentation.GetCardTypes().then(res => {
            if (res.data.ok) {
                setCardTypes(res.data.data.cardTypes)
            }
        })
    }

    const PackageCurrencies = () => {
        return (
            <div className='ac-currencies'>
                {currencies?.map((cur, index) => (
                    <span className='ac-currency' key={index} >{cur.value} 0.00</span>
                ))}
            </div>
        );
    };

    const OrderControl = () => {
        return (
            <div className='order-control'>
                <span onClick={(event) => { event.stopPropagation(); setCount(count - 1) }}>-</span>
                <span>{count}</span>
                <span onClick={(event) => { event.stopPropagation(); setCount(count + 1) }}>+</span>
            </div>
        )
    }

    return (
        cardTypes.map((card, index) => (
            <div className='ct-wrap' 
            key={index}>
                <label htmlFor={'cardtype' + index}>
                    <input type='checkbox' id={'cardtype' + index} onChange = {(e) => {console.log(e.target.checked)}}/>
                    <img style={{ width: 45 }} src={card.imageURL} alt='' />
                    <div>
                        <div>UNICard VISA ბარათი</div>
                        <PackageCurrencies />
                    </div>
                    
                </label>
                <OrderControl />
            </div>
        ))

    );
};

SelectCardType.propTypes = {

};

export default SelectCardType;