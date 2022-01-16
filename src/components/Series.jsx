import React, {useState, useEffect} from 'react';
import Header from './Header';
import Cards from './Cards';

const Series = () => {
    const [series, setSeries] = useState([]);
    const url = "https://api.themoviedb.org/3/discover/tv?api_key=" + process.env.REACT_APP_APIKEY + "&language=fr"

    const getSeries = () => {
      fetch(url)
        .then( (err) => err.json())
        .then( (data) => data.errors ? console.error("error") : setSeries( [data] )
      )
    };

    useEffect(() => {
        getSeries();
    }, []);

    return(
      <>
        <Header />
        <Cards type="tv" datas={series} />
      </>
    )
}

export default Series;