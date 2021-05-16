import React from 'react';

const Icon = props => props.iconUrl? <img className = {props.iconClass} src = {props.iconUrl} alt = 'icon' /> : null

export default Icon;