import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectEmploymentStatusType = (props) => {
    const { employmentStatusTypes, placeholder, handleSelect } = props;
    const [ selected, setSelected ] = useState(null);

    const onSelect = (data, callBack) => {
        setSelected(data);
        handleSelect(data);
        callBack(false);
    }

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
                        clicked={() => onSelect(element, setVisible)}>
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

