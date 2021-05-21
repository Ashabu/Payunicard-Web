import React from 'react';

const Widget = props => (<div className = {props.class? 'Widget '+  props.class : 'Widget'}>{props.children}</div>)

export default Widget;