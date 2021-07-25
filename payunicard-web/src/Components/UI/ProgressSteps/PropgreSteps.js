import React, { useState, memo, useEffect } from 'react';
import './progressStep.scss';




const PropgreSteps = (props) => {
    const { stepCount, activeStep, hasError } = props;
    const [circle, _] = useState([...Array(stepCount).keys()]);

    console.log('renderedSteps')

    const lineClass = (index) => {
        let lineClass = 'connect-line'
        if (index <= activeStep) {
            if (hasError && index === activeStep) {
                lineClass += ' danger';
            }
            lineClass += ' active';
        }
        return lineClass
    }

    const circleClass = (index) => {
        let circleClass = 'circle'
        if (index <= activeStep) {
            if (hasError && index === activeStep) {
                circleClass += ' danger'
            }
            circleClass += ' active'
        }
        return circleClass
    }

    return (
        <div className='Steps'>
            {circle.map((step, index) => (
                index !== 0 ?
                    <div className='step' key={index}>
                        {index !== 1 ? <div className={lineClass(index)}></div> : null}
                        <div className={circleClass(index)}> {step}</div>
                    </div> : null
            ))}
        </div>
    )
}


export default memo(PropgreSteps);
