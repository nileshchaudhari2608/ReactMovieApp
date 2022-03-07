import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

// Main const app 
const App = () => {
	// to set movies and movie array
	const [movies, setMovies] = useState([]);
	// to set favouryte and array of favourite movies
	const [favourites, setFavourites] = useState([]);
	// set value and movie search inpute for API
	const [searchValue, setSearchValue] = useState('');

	//for getting movie from OMDbAPI function 
	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3348d5e1`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};
	// take inpute for search movie and series
	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);
	// save and keep favourite movie in local storage 
	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
		// set favourite movies
		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);
 // save and keep favourite movie in local storage 
	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};
	// add favourite movies ing array of favourite movies list
	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
	// removing favourite movie from favourite movie list 
	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-left mt-1 mb-1'> 
				{/* heading of the website */}
				<MovieListHeading heading='Movies and Series' />
				{/* Search box on the main page taking inpute and sending data */}
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			{/* add movie to add favourite movie on click */}
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			{/* heading for Favourites movies and series */}
			<div className='row d-flex align-items-center mt-1 mb-1'>
				<MovieListHeading heading='Favourites' />
			</div>
			{/* Removing movies and series from favourite list */}
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
