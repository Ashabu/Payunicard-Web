import React, {useState} from 'react';
import './search.scss';
import PropTypes from 'prop-types';



const  Search = (props) => {

    const [searchValue, setSearchValue] = useState('');

    return (
        <div className = 'Search'>
            <img src = '../../../Assets/Images/clip.png' alt = 'icon' />
            <input type = 'text' value = {searchValue} placeholder = 'Search...' 
                onFocus = {(e) => e.target.placeholder = ''} 
                onBlur = {(e) => e.target.placeholder = 'Search...'} 
                onChange = {(e) => {setSearchValue(e.target.value); props.onsearch(e.target.value)}} />
        </div>
    );
}

Search.propTypes = {
    searchValue: PropTypes.string,
    onsearch: PropTypes.func,
};

export default Search;