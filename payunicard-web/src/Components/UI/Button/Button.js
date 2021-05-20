import React, { Fragment }  from 'react';
import "./button.scss"
import PropTypes from "prop-types"
const Button = (props) => {
    // const buttonRef = useRef();
    // const clickEvent = (event) => {
    //     if (event.isComposing || event.keyCode === 13) {
    //       buttonRef.click();
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('click', clickEvent);
    //     return () => {
    //         window.removeEventListener(clickEvent);
    //     }
    // }, [])

    let  button = ( <button className={props.buttonClass} onClick={props.clicked}>{props.children}</button>)
    if(props.loading) {
        button = (<div className="btn-wrap">
                      <button className={props.class + " disabled"} onClick={props.clicked} >{props.children}</button>
                      <img  className="btn-loader" src = "../../Assets/Images/loader.svg" alt="loader" /> 
                  </div>)
        }

    return (
        <Fragment>
           {button}
        </Fragment>
    );
};

Button.propTypes = {
    // children: PropTypes.string,
    clicked: PropTypes.func,
    loading: PropTypes.bool,
}

export default Button;