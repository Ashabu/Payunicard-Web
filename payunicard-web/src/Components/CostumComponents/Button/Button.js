import React from 'react';
import "./button.scss"
import PropTypes from "prop-types"

const Button = (props) => {

    let  button = ( <button className={props.class} onClick={props.clicked}>{props.children}</button>)
    if(props.loading) {
        button = (<div className="btn-wrap">
                      <button className={props.class + " disabled"} onClick={props.clicked}>{props.children}</button>
                      <img  className="btn-loader" src = "../../Assets/Images/loader.svg" alt="loader" /> 
                  </div>)
        }

    return (
        <div>
           {button}
        </div>
    );
};

Button.prototype = {
    children: PropTypes.string,
    clicked: PropTypes.func,
    loading: PropTypes.bool,
}

export default Button;