import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectWorkType = (props) => {
    const { workTypes, placeholder } = props;
    const [ selected, setSelected ] = useState(null);

    return (
        <Select
            selectClass = 'Selected mb-20'
                data = { workTypes } 
                selected = { selected ? selected?.customerEmploymentType : <div style={{padding: 10}}>{ placeholder }</div> }
                display ={(element, setVisible) => (
                    <SelectList 
                        key={ element.customerEmploymentType } 
                        selected = { element } 
                        list
                        listClassRow = 'selectLIst'
                        clicked={() => { setSelected(element); setVisible(false)}}>
                            {element.customerEmploymentType}
                    </SelectList> 
                )}/>
    )
}

SelectWorkType.propTypes = {
    employmentStatus: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectWorkType;

