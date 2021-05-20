import React from 'react'
import './userProducts.scss';
import PropTypes from 'prop-types'
import { Widget } from '../UI/UiComponents';
import UserProduct from './UserProducts';

const UserProducts = (props) => {
  
    return (
        <Widget>
            <p>ჩემი პროდუქტები</p>
            {props.userproducts.map(product => {
                debugger
                console.log(product)
            })}

        </Widget>
        
    )
}

UserProducts.propTypes = {

}

export default UserProducts;
