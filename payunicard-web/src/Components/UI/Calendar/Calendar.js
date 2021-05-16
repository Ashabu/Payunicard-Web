import React from 'react';
import './calendar.scss'
import PropTypes from 'prop-types';



const  Calendar = (props) => {



    return (
        <div className = 'calendar'>
            <div className = 'calendar__from'>
                <span>FROM</span>
                <input value = {props.fromDate} type = 'date' onChange = {(e) => props.setDate({val: 'From', fromDate: e.target.value})}/>

            </div>
            <div className = 'calendar__to'>
                <span>TO</span>
                <input value = {props.toDate} type = 'date' onChange = {(e) => props.setDate({val: 'To', toDate: e.target.value})} />
            </div>
            
        </div>
    );
}

Calendar.propTypes = {
    
};

export default Calendar;