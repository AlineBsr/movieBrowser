import React from "react";

const Cards = (props) => {
  const { type , datas}  = props;
  
  return (
    <div className="card-container">
    {datas.map((data) =>  
      <article
        className="card-content"
        key={`${data.id}`}
      > 
        <header>
          {/* {console.log(props.type)} */}
           <h1>{ type === "tv" ? data.name : data.original_title }</h1>
          <a href={`/${type}/${data.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${data.backdrop_path}`}
              alt={`affiche du film ${data.original_title}`}
            />
          </a>
        </header>
      </article>

       )}
    </div>
  );
};

export default Cards;
