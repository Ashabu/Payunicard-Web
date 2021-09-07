import React from 'react'

const SwitchTab = (props) => {

    return (
        <div className='ct-tab' onClick={props.onClick}>
            <div className={props.anualPrice ? 'ct-tab-option' : 'ct-tab-option active'}>
                <span>კვარტალი</span>
            </div>
            <div className={props.anualPrice ? 'ct-tab-option active' : 'ct-tab-option'}>
                <span>წელიწადი</span>
            </div>
        </div>
    )
}

export default SwitchTab
