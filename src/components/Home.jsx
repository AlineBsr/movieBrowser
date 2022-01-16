import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards";

// tendances films
const Home = (props)  => {
  const [ trends, setTrends ] = useState([]);
  const [ page, setPage ] = useState(1);
  const { type, lang } = props;
  
  const getTrends = () => {
    const url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.REACT_APP_APIKEY}&language=${lang}&page=${ page }`;
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
      <h1>Trends </h1>
      {console.log(trends)}
      <Cards type="movie" datas={trends} />
    </div>
  );
}

export default Home;