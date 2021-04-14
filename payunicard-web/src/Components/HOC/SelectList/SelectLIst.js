import React from 'react';

const Selectlist = props => (<div className = {props.listClass} onClick = {props.clicked}>{props.children}</div>);

export default Selectlist;