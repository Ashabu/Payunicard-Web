import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectEmploymentStatusType = (props) => {
    const { employmentStatusTypes, placeholder } = props;
    const [ selected, setSelected ] = useState(null);

    return (
        <Select
        selectClass = 'Selected mb-20'
                data = { employmentStatusTypes } 
                selected = { selected ? selected?.employmentStatus : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.employmentStatus } 
                        selected = { element } 
                        list
                        listClassRow = 'selectLIst'
                        clicked={() => { setSelected(element); setVisible(false)}}>
                            {element.employmentStatus}
                    </SelectList> 
                )}/>
    )
}

SelectEmploymentStatusType.propTypes = {
    employmentStatus: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectEmploymentStatusType;

