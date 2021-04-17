import React from 'react';
import './sliderInfro.scss'
import PropTypes from 'prop-types';

const SliderInfo = props => {
    console.log(props)
    return (
        <div className = 'SliderInfo' >
            <div className = 'service-icon'>
                <img src = {props.imgUrl} alt = 'service-icon' />
            </div>
            <div className = 'service-text'>
                <div className = 'service-content'>
                    <span className = 'title-text' >{props.title}</span> {/*ref = 'titleFade'*/}
                    <span className = 'content-text' > {/*ref = 'contentFade'*/}
                        {props.content.map((content, index) => (
                        <span key = {content}>
                            <img src= '../../Assets/Images/LandingImg/checkmark-bg.svg' alt= 'icon' />
                            <span>{content}</span></span>
                            ))}
                    </span>    
                </div>
            </div>
        </div>
    );
};

SliderInfo.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.array,
};

export default SliderInfo;



                
                        