import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards";

// tendances films
const Home = (props)  => {
  const [ trends, setTrends ] = useState([]);
  const { type, lang } = props;
  
  const getTrends = () => {
    const url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.REACT_APP_APIKEY}&language=${lang}`;
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
  );
}

export default Home;