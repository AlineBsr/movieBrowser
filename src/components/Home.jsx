import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards";

// tendances films
const Home = (props)  => {

  const [ trends, setTrends ] = useState([]);
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_APIKEY}`;

  const getTrends = () => {
    console.log(url)
    fetch(url)
    .then( (err) => err.json() )
    .then( (data) =>  data.error ? console.error("error") : setTrends(data.results) )
  }

  useEffect(() => {
    getTrends();
  }, [])
  
  return(
    <div className="home-container">
      <Header />
      <Cards type="movie" datas={trends} />
    </div>
  )
}

export default Home;