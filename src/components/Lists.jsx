import React, { useState, useEffect } from 'react';
import Header from './Header';
import Search from './Search';
import Cards from './Cards';

const Lists = (props) => {
  const [movies, setMovies] = useState([]);
  const url = `https://api.themoviedb.org/3/discover/${props.type}?api_key=${process.env.REACT_APP_APIKEY}`;
  
  const getMovies = () => {
  fetch(url)
      .then((err) => err.json() )
      .then((data) => { data.errors ? console.error("error") : setMovies( data.results )
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>      
      <Header />
      <h1>Find Movies, Tv series, and more....</h1>
      <br />
      <Search />
      <div>
        <a href="/movie">Movies</a>
        <a href="/tv">TvSeries</a>
      </div>

      <Cards type={props.type} datas={movies} />
      
    </>
  )
}

export default Lists;