import React, { useContext } from 'react';
import './navigation.scss';
import { Context } from '../../../Context/AppContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const NavigationItem = (props) => {

    const { state } = useContext(Context);
    const { activeLang } = state;

    const { pageUrl, imgUrl, title, id } = props.navitem;

    return (
        <Link to = {pageUrl} className = 'navItem-wrap'>
            <div className = 'navItem'>
                <img src = {imgUrl} alt = 'icon' />
            </div>  
                <span>{title[activeLang]}</span>
            
        </Link>
    );
}


NavigationItem.propTypes = {
    
};

export default NavigationItem;




// <div v-for="(item, index) in NavMenu" v-if="index !== 2" :key="item.id" :class="[item.activeClass ==true? 'nav-menu-wrap active': 'nav-menu-wrap', item.forMobile ? '': 'forMobile' ]">


// </div>