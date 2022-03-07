import React from 'react';

//search box for searching any movie or series
const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
	         {/* using form-control create search bar */}
			<input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;
