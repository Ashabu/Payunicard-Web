import React from 'react'


const BankDetail = (props) => {
    const { title, value } = props.allUserCurrencies
    return (
        
            <div className = 'ac-bankdetails' key = { value }>
                <div className = 'detail-cur'>
                    <div className = 'cur-round'>
                        <span> { value}</span>
                    </div>
                        <span>{ title }</span>
                </div>
                <div className = 'detail-download'>
                    <img src = '../../Assets/Images/download-icon-grey.png' alt = 'icon' />
                </div>
            </div>
    )
}

export default BankDetail
