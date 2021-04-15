import React from 'react';
import PropTypes from 'prop-types';

const SliderInfo = props => {
    return (
        <div className = 'SliderInfo' >
            <div className = 'service-icon'>
                <img src = {props.imgUrl} alt = 'service-icon' />
            </div>
            <div className = 'service-text'>
                <div className = 'service-content'>
                    <span className = 'title-text' >{props.title}</span> {/*ref = 'titleFade'*/}
                    <span className = 'content-text' > {/*ref = 'contentFade'*/}
                        {props.content.map((c, index) => (<span key = {c}>{c}</span>))}
                    </span>    
                </div>
            </div>
            
        </div>
    );
};

SliderInfo.propTypes = {
    
};

export default SliderInfo;



                
                        