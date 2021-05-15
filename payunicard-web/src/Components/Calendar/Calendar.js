import React, {useState} from 'react';
import './calendar.scss'
import PropTypes from 'prop-types';



const  Calendar = (props) => {



    return (
        <div className = 'calendar'>
            <div className = 'calendar__from'>
                <span>დან</span>
                <input value = {props.fromDate} type = 'date' onChange = {(e) => props.setDate({val: 'From', fromDate: e.target.value})}/>

            </div>
            <div className = 'calendar__to'>
                <span>მდე</span>
                <input value = {props.toDate} type = 'date' onChange = {(e) => props.setDate({val: 'To', toDate: e.target.value})} />
            </div>
            
        </div>
    );
}

Calendar.propTypes = {
    
};

export default Calendar;