import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards";

// tendances films
const Home = ( { lang } )  => {
  const [ trends, setTrends ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ typeTrend, setTypeTrend ] = useState("all");
  
  const getTrends = () => {
    const url = `https://api.themoviedb.org/3/trending/${typeTrend}/week?api_key=${process.env.REACT_APP_APIKEY}&language=${lang}&page=${ page }`;
    fetch(url)
    .then( (err) => err.json() )
    .then( (data) =>  data.error ? console.error("error") : setTrends(data.results) )
  }
  
  useEffect(() => {
    getTrends();
  }, [page])
  
  return(
    <div className="home-container">
      <Header />
      <h1>All Trends over the last 7 days</h1>
      <Cards type={typeTrend} page={page} datas={trends} />
    </div>
  );
}

export default Home;