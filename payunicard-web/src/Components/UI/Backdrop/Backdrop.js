import React from 'react';
import './backdrop.scss'

const Backdrop = (props) => (
    props.show? <div className = 'Backdrop'>{props.children}</div> : null
)

export default Backdrop;