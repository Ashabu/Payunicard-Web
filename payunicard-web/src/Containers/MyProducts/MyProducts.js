import React from 'react'
import PropTypes from 'prop-types'
import AuthorizedLayout from './../AuthLayout/AuthorizedLayout';

const MyProducts = (props) => {
    const {} = props

    return (
        <AuthorizedLayout pageName = "ჩემი პროდუქტები">
       <div>
           <h1>MyProducts</h1>
       </div>     
       </AuthorizedLayout>
    )
}

MyProducts.propTypes = {

}

export default MyProducts;
