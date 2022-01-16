import React from "react";

const Cards = (props) => {
  const { type , datas}  = props;
  
  return (
    <div className="card-container">
    {datas.map((data) =>  
      <article
        className="card-content"
        key={`${data.id}`}
      > <a href={ data.media_type !== undefined ? `/${data.media_type}/${data.id}` :`/${type}/${data.id}` }> 
        {console.log(data)}
        
        { data.name !== undefined && <div className="cards-vote-average"><h1>  {data.name} </h1> <p >{data.vote_average} <i className="fas fa-star"> </i></p></div>  }
        { data.original_title !== undefined &&  <div className="cards-vote-average"><h1> {data.original_title} </h1>  <p>{data.vote_average}<i className="fas fa-star"> </i></p></div> }
        <img
          src={`https://image.tmdb.org/t/p/w200/${data.backdrop_path}`}
          alt={`affiche du film ${data.original_title}`}
        />
        </a>   
      </article>
      )}
    </div>
  );
};

export default Cards;
