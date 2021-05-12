import React from 'react';
import './backdrop.scss'
import PropTypes from 'prop-types'

const Backdrop = (props) => {
    const {show, hide, children} = props;
    return show? <div className = 'Backdrop' onClick = {hide}>{children}</div> : null
}


Backdrop.propTypes = {
    show: PropTypes.bool,
    hide: PropTypes.func,
}
export default Backdrop;