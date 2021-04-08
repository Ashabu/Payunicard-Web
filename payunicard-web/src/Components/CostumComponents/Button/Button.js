import React from 'react';
import "./button.scss"
import PropTypes from "prop-types"

const Button = (props) => {
    return (
        <div className="btn-wrap">
            <button className={props.class} onClick={props.clicked}>{props.children}</button>
            {/* <img  className="btn-loader" src = "../../Assets/Images/loader.svg" alt="loader" />    */}
        </div>
    );
};

Button.prototype = {
    children: PropTypes.string,
    clicked: PropTypes.func,
}

export default Button;