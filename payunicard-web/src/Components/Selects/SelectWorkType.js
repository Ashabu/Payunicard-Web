import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, SelectList } from '../UI/UiComponents';

const SelectWorkType = (props) => {
    const { workTypes, placeholder, handleSelect } = props;
    const [selected, setSelected] = useState(null);

    const onSelect = (data, callBack) => {
        setSelected(data);
        handleSelect(data);
        callBack(false);
    }

    return (
        <Select
            selectClass='Selected mb-20'
            data={workTypes}
            selected={selected ? selected?.customerEmploymentType : <div style={{ padding: 10 }}>{placeholder}</div>}
            display={(element, setVisible) => (
                <SelectList
                    key={element.customerEmploymentType}
                    selected={element}
                    list
                    listClassRow='selectLIst'
                    clicked={() => onSelect(element, setVisible)}>
                    {element.customerEmploymentType}
                </SelectList>
            )} />
    )
}

SelectWorkType.propTypes = {
    workTypes: PropTypes.array,
    placeholder: PropTypes.string
}

export default SelectWorkType;

