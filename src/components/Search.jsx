import React, { useState, useEffect } from 'react';

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
  }
   
  const getSearchResult = () => {
  console.log("value = " + search);
  const url = `https://api.themoviedb.org/3/search/${search}?api_key=${process.env.REACT_APP_APIKEY}`;
    fetch(url)
      .then( (err) => err.json() )
      .then( (data) => { data.errors ? console.error("error") : setSearchResults( [data.results] )})
  }

  useEffect(() => {
    getSearchResult()
    // console.log(searchResults)
  }, [])

  return(
        <form >
            <label htmlFor="search"><i className="fas fa-search"></i></label>

            <input  type="search" name="search" 
                value={search} 
                // onSubmit={ () => }
                onChange={ (e) => {
                  getSearchResult()  
                    handleSearchChange(e);
                  }
                }
            />
        </form>
    )
}

export default Search;