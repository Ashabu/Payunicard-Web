import React, { useContext } from 'react';
import './navigation.scss';
import NavigationItem from './NavigationItem';
import PropTypes from 'prop-types';
import UIdata from '../../UI/UIdata';

const navigationItems = UIdata.NavigationPanel;



const NavigationPanel = (props) => {


    return (
        <div className = 'NavigationPanel'>
            {navigationItems.map(item => (<NavigationItem key ={ item.id } navitem = { item }/>) )}
        </div>
    );
}


NavigationPanel.propTypes = {
    
};
export default NavigationPanel;