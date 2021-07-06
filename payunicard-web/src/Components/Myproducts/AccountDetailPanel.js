import React from 'react';
import { SidePanel } from '../UI/UiComponents';
import AccountDetailCard from './AccountDetailCard';

const AccountDetailPanel = (props) => {
    const { visible, account } = props;
    return (
        <SidePanel
            visible = { visible }>
                <AccountDetailCard account = { account }/>
        </SidePanel>
    )
}

export default AccountDetailPanel
