import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards";
import Loader from "./Loader";

// tendances films
const Home = ( { lang } )  => {
  const [ trends, setTrends ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ typeTrend, setTypeTrend ] = useState("all");
  const  [isLoading, setIsLoading] = useState();
  const urlTrend = `https://api.themoviedb.org/3/trending/${typeTrend}/week?api_key=${process.env.REACT_APP_APIKEY}&language=${lang}&page=${ page }`;
  
  const getTrends = () => {
    setIsLoading(true);
    fetch(urlTrend)
      .then( response => response.json() )
      .then( data =>  setTrends(data.results) )
      .catch( error => console.error(error) )
      .finally( () => setIsLoading(false) )
  }
  
  useEffect(() => {
    getTrends();
  }, [page])
  
  return(
    <div className="home-container">
      <Header />
      <h1>All Trends over the last 7 days</h1>
      { isLoading === true ? <Loader /> : <Cards type={typeTrend} page={page} datas={trends} /> }
    </div>
  );
}

export default Home;