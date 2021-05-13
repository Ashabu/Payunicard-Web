import React from 'react';
// const areEqual = (prevProps, nextProps) => true;
// console.log(areEqual)

const Selectlist = props => (<div className = {props.listClass} onClick = {props.clicked}>{props.children}</div>);

export default React.memo(Selectlist);