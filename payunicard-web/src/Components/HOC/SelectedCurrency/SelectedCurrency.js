import React, { Fragment } from 'react';

import { formatCurrencySymbol } from '../../../Services/CommonFunctions';

const SelectedCurrency = props => {
    const { selected, list, onDisabled } = props;
    const { key, value } = selected;
    
return (
        <div className = {onDisabled? 'selectedAccount list disabled' : 'selectedAccount'} onClick = {list? props.clicked : () =>{}}>
                   
                        { list? key : value }
                </div> 
            
    )
}

export default SelectedCurrency;