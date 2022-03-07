import React from 'react';
// create list of movie 
const MovieList = (props) => {
	// component for favourite 
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
		{/* maping movie and output movie's poster */}
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div
					// method for handeling favourite
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;