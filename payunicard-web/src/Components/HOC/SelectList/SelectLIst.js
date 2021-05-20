import React from 'react';


const SelectList = props => (<div className = {props.listClassRow} onClick = {props.clicked}>{props.children}</div>);

export default React.memo(SelectList);