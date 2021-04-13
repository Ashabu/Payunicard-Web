import React, { useEffect, useRef, useState } from 'react';
import "./button.scss"
import PropTypes from "prop-types"
const Button = (props) => {
    // const buttonRef = useRef();
    // const clickEvent = (event) => {
    // debugger
    //     if (event.isComposing || event.keyCode === 13) {
    //       buttonRef.click();
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('click', clickEvent);
    //     return () => {
    //         debugger
    //         window.removeEventListener(clickEvent);
    //     }
    // }, [])

    let  button = ( <button className={props.buttonClass} onClick={props.clicked}>{props.children}</button>)
    if(props.loading) {
        button = (<div className="btn-wrap">
                      <button className={props.class + " disabled"} onClick={props.clicked} ref={buttonRef}>{props.children}</button>
                      <img  className="btn-loader" src = "../../Assets/Images/loader.svg" alt="loader" /> 
                  </div>)
        }

    return (
        <div>
           {button}
        </div>
    );
};

Button.propTypes = {
    // children: PropTypes.string,
    clicked: PropTypes.func,
    loading: PropTypes.bool,
}

export default Button;