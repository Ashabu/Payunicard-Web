import React, { Fragment } from 'react';
import { useHistory } from "react-router";
import './userProduct.scss';
import UserProduct from './../UserProducts/UserProduct';
import { Button, Widget } from '../UI/UiComponents';
import PropTypes from 'prop-types';

const  UserProducts = (props) => {

    const history = useHistory();

    return (
        <Widget>
            {props.userproducts? 
            <Fragment >
                <p>ჩემი პროდუქტები</p>
               {props.userproducts.map(product => (<UserProduct key = { product.productID } userproduct = { product }/>))}
               <Button buttonClass = 'loadmore'   clicked = {() => history.push('/transactions')}>მეტი</Button>  
            </Fragment> : <img style = {{width: 50, margin: 'auto'}}src = '../../Assets/Images/loader.svg' alt = 'loader' />}
        </Widget>
    )
}

UserProducts.propTypes = {
    userproducts: PropTypes.array
}

export default UserProducts;
