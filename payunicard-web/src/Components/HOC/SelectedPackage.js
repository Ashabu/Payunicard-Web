import React from 'react'
import { formatNumber } from '../../Services/CommonFunctions';

const SelectedPackage = (props) => {
    const { selected, price, anualPrice } = props;
    const { paketTypeId, paketCode, priceQuarterly } = selected;
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginRight: 30 }}>
            <span>{paketCode}</span>
            <span>{anualPrice && paketTypeId !== 2 ?
                <span style={{ color: '#c00f0f', textDecoration: 'line-through' }}>{formatNumber(priceQuarterly * 4)} ₾ </span>
                : null}
                {price}</span>
        </div>
    )
}

export default SelectedPackage;