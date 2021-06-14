import React from 'react';
import { formatNumber } from '../../Services/CommonFunctions';
import { Icon } from '../UI/UiComponents';


const PaymentDetails = (props) =>{
    const { data, commisionAmmount, debtAmmount } = props;
    const totalDue = Number(commisionAmmount) + Number(debtAmmount);
  
    return(
        <div>
            <div className = 'detail-header'>
                <span>სად</span>
                <span>თანხა</span>
                <span>თანხა</span>
            </div>
            {data?.map((item, index) =>(<div className = 'detail-body' key ={ index }>
                <div className = 'templImg' style={{width: 60}}>
                    <Icon iconUrl = { item.imageUrl }/>
                    
                </div>
                <div className = 'templDetails'>
                    <span>{ item.templName }</span>
                    <span>{ item.abonentCode }</span>
                </div>
                <div className = 'templAmount'>

                   <span> { formatNumber(Math.abs(item.debt)) } ₾</span> 
                </div>
                <div className = 'templAmount'>

                   <span>{ formatNumber(item.commission) } ₾</span> 
                </div>
            </div>))}
            <div style={{display:'flex', flexFlow: 'column', textAlign: 'end'}}>
                <span>თანხა: { formatNumber(debtAmmount) } ₾</span>
                <span>საკომისიო: { formatNumber(commisionAmmount) } ₾</span>
                <hr style={{width: '100%'}}/>
                <span>ჯამური თანხა: { formatNumber(totalDue)} ₾</span>
            </div>
            
            
        </div>
    )
}

export default PaymentDetails;