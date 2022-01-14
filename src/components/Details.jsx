import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

const Details = (props) => {
    const { lang, type, ...rest} = props;
    const [ details, setDetails ] = useState([]);
    const { id } = useParams();
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=${props.lang}&append_to_response=videos,images`;

    const getDetails = () => {
        fetch(url)
        .then( (err) => err.json() )
        .then( (data) => data.errors ? console.error("error") : setDetails( [data] )
    )}
    useEffect(() => {
        getDetails();
    }, [])

    return (
        
        <div>
            {details.map( (detail) =>

            <article    key={id} 
                        className="details-container"
            >
                { console.log(detail.videos.results)}

                { detail.videos.results.map( (result) => 
                result.type === "Trailer" && 
                    <video width="480" controls>
                        <source src={`https://www.youtube.com/watch?v=${result.key}`} 
                                type="video"/>

                        Your browser does not support HTML5 video.
                    </video>
                )}
                <header>
                    {/* <i className="fas fa-play-circle details-play-button"></i> */}
                    <img src={ `https://image.tmdb.org/t/p/w500/${detail.backdrop_path}` }
                         alt={ `affiche de ${detail.name}` }
                    />

                    { type === "tv" ?<h1> {detail.name} </h1> : <h1> {detail.title} </h1> }
                    <div className="details-content ">
                        <p><i className="fas fa-clock"></i> {type === "tv" ? detail.episode_run_time: detail.runtime } mins </p>
                        <p><i className="fas fa-star"> </i> {detail.vote_average} (imDb)</p>
                        { type === "tv" ? (detail.seasons.length === 1 ? <p>1 season</p> : <p> {detail.seasons.length} seasons </p>) : null }
                    </div>
                    
                    <div className="details-content genre">
                        <h2 className="details-subtitle">Genres</h2>
                        { detail.genres.map( (genre) =>
                            <p key={`genre-${genre.id}`} >
                             {genre.name}
                            </p>
                        )}
                        <h2 className="details-subtitle">Release date</h2>
                        <p>{ type === "tv" ? detail.last_air_date : detail.release_date}</p>
                    </div>

                    <div className="details-content ">
                        <h2 className="details-subtitle">Synopsis</h2>
                        <p className=""> {detail.overview} </p>
                    </div>

                    <div className="details-content">
                        <h2 className="details-subtitle">Related movies</h2>
                    </div>

                </header>

            </article>
            )}
        </div>
    )
}

export default Details;