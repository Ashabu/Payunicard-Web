import React, { useContext } from 'react';
import './verificationStatus.scss';
import { Context } from '../../Context/AppContext';
import { Button, Widget } from '../UI/UiComponents';


const UserVerificationstatus = () => {
    const { state } = useContext(Context)
    const { userVerificationstatus } = state;


    return (
        <Widget>
            <div className = 'verificationStatus'>
                <img src = '../../Assets/Images/alert_green.png' alt = 'icon'/>
                <span>ანგარიში ვერიფიცირებულია</span>
            </div>
            {userVerificationstatus === 'Not Verified' ? <Button>დაიწყე </Button> : null}
        </Widget>
    );
}

export default UserVerificationstatus;