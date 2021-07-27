import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectPackage = (props) => {
    const { packages, placeholder, handleSelect, anualPrice } = props;
    const [selected, setSelected] = useState(null);

    const onSelect = (data, callBack) => {
        setSelected(data);
        // handleSelect(data);
        callBack(false);
    }

    useEffect(() => {
        if (!anualPrice && selected?.paketTypeId === 2) {
            setSelected(null);
        }
    }, [anualPrice])

    const packagePrice = (data) => {
        if (anualPrice) {
            return data.priceAnnual + '₾'
        } else {
            if (data.paketTypeId === 2) {
                return data.priceAnnual + '₾/წელიწადი'
            } else {
                return data.priceQuarterly + '₾/კვარტალი'
            }
        }
    }

    return (
        <Select
            selectClass='Selected mb-20'
            data={packages}
            selected={selected ? <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                marginRight: 30
            }}><span>{selected?.paketCode}</span><span>{packagePrice(selected)}</span></div> : <div style={{ padding: 10 }}>{placeholder}</div>}
            display={(element, setVisible) => (
                element.paketTypeId !== 1 ?
                    <SelectList

                        key={element.paketTypeId}
                        selected={element}
                        list
                        listClassRow={!anualPrice && element.paketTypeId === 2 ? 'selectLIst disabled' : 'selectLIst'}
                        clicked={() => onSelect(element, setVisible)}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginRight: 30
                        }}><span>{element.paketCode}</span><span>{packagePrice(element)}</span></div>
                    </SelectList> : null
            )} />
    )
}

SelectPackage.propTypes = {
    packages: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectPackage;

