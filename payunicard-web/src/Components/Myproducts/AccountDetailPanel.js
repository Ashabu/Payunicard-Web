import React from 'react';
import { SidePanel } from '../UI/UiComponents';

const AccountDetailPanel = (props) => {
    const { visible } = props;
    return (
        <SidePanel
            visible = { visible }>

        </SidePanel>
    )
}

export default AccountDetailPanel
