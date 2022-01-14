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
      // null
      //   <ul className="box" >
      //   { series.map( (serie) => 
      //     <li  key= {`${serie.id}`}>{serie.name}
      //       <a href={`/series/${serie.id}`} >
      //         {serie.id} : {serie.name} <br/>
      //       <img src={ `https://image.tmdb.org/t/p/w300/${serie.backdrop_path}` }
      //            alt={ `affiche du film ${serie.name}` } 
      //       /> 
      //       </a>
      //     </li> 
      //     )
      //   }
      //   {console.log(series)}
      // </ul>
    )
}

export default Series;