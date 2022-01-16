import React, {  useState, useEffect  } from "react";
import Header from "./Header";
import Cards from "./Cards";

const Lists = ( { type, lang } ) => { 
  // videos
  const [listVideos, setListVideos] = useState([]);
  // types videos
  const [colorActive, setColorActive] = useState({ color: "#ff8f71", "fontWeight": "bold" });
  const [colorInactive, setColorInactive] = useState({  color: "grey"  });
  // categories videos
  const [categ, setCateg] = useState();
  const [categSelected, setCategSelected] = useState("");
  const [selectCateg, setSelectCateg] = useState("true");
  // pages results
  const [page, setPage] = useState(1);
  // search
  const [search, setSearch] = useState("");

  const getMovies = () => { 
    categSelected === undefined ? setCateg("") : setCateg(categ);
    const url = `https://api.themoviedb.org/3/discover/${ type }?api_key=${ process.env.REACT_APP_APIKEY }&language=${ lang }&with_genres=${ categSelected }&page=${ page }`;
    fetch(url)
      .then((err) => err.json())
      .then((data) =>
        data.errors ? console.error("error") : setListVideos(data.results)
      );
   };

  const getCategories = () => { 
    const url = `https://api.themoviedb.org/3/genre/${ type }/list?api_key=${ process.env.REACT_APP_APIKEY }&language=${ lang }`;
    fetch(url)
      .then((err) => err.json())
      .then((data) => (data.error ? console.error("error") : setCateg(data)));
   };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearchSubmit = () => { 
    getSearchResult();
    setSearch("");
  }
  
  const getSearchResult = () => {
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_APIKEY}&query=${search}`;
    search !== "" && 
    fetch(url)
        .then( (err) => err.json() )
        .then( (data) => { data.errors ? console.error("error") : setListVideos(data.results) } )
    }   

  const handleButtonPrevNextClick = (event) => { 
    event.target.name === "next" && setPage(page + 1);
    event.target.name === "prev" && setPage(page - 1);
   };

  useEffect(() => { 
    getMovies();
    getCategories();

   }, [setListVideos, search, categSelected, page ]);

  return (
    <>
      <Header />
      <h1>Find Movies, Tv series, and more....</h1>
      { /* set list of the categories of type selected */ }
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="search"><i className="fas fa-search"></i></label>
        { search !== undefined && getSearchResult() }
        <input  type="search" name="search" 
            value={search} 
            // onSubmit={ () => }
            onChange={ (e) => { e !== undefined && handleSearchChange(e);
              }
            }
        />
      </form>
      <div className="lists-cat">
        { categ !== undefined &&
          categ.genres.map((genre) => (
            <button
              className="lists-but"
              key={ genre.id }
              id={ genre.id }
              value={ genre.name }
              onClick={ (event) =>
                event.target.id !== undefined &&
                setCategSelected(event.target.id)
               }
            >
              { genre.name }
            </button>
          ))
        }
        <button
          className="lists-but"
          key="0000"
          id="0000"
          value="all"
          onClick={ (event) => setCategSelected("") }
        >
          All
        </button>
      </div>
      
      { /* set list of type videos showing : movies or tv shows */ }
      <div className="lists-categories">
        <a
          href="/movie"
          style={ type === "movie" ? colorActive : colorInactive }
          onClick={ () => setSelectCateg(!selectCateg) }
        >
          <i className="fas fa-eye"></i>
          Movies
        </a>
        <a
          href="/tv"
          style={ type === "tv" ? colorActive : colorInactive }
          onClick={ () => setSelectCateg(!selectCateg) }
        >
          <i className="fas fa-eye"></i>
          TvSeries
        </a>
      </div>

      { /* display cards */ }
      <Cards type={ type } lang={lang} page={page} datas={listVideos} /> 

      {/* // set buttons pagination */}
      <div className="lists-but-pag-container">
        {page > 1 && (
          <button
            className="lists-but"
            name="prev"
            onClick={(event) => handleButtonPrevNextClick(event)}
          >
            {`<< PREV `}
          </button>
        )}
        <button
          className="lists-but"
          name="next"
          onClick={(event) => handleButtonPrevNextClick(event)}
        >
          {`NEXT >> `}
        </button>
      </div>
    </>
  );
 };

export default Lists;
