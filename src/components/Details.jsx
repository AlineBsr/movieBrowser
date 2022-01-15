import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

import YoutubeEmbed from "./YoutubeEmbed";

const Details = (props) => {
    const { lang, type, ...rest} = props;
    const { id } = useParams();
    const [ details, setDetails ] = useState([]);
    const [ displayVideo, setDisplayVideo ] = useState(true)

    const getDetails = () => {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=${props.lang}&append_to_response=videos,images`;
        fetch(url)
        .then( (err) => err.json() )
        .then( (data) => data.errors ? console.error("error") : setDetails( [data] )
    )}

    const displayTrailer = () => {
        setDisplayVideo(!displayVideo);
    }

    useEffect(() => {
        getDetails();
    }, [])

    return (
        <>
            {details.map( (detail) =>
            <article key={id} className="details-container">
                <div className="details-head">
                    <i className="fas fa-play-circle "></i>
                    <img src={ `https://image.tmdb.org/t/p/w500/${detail.backdrop_path}` }
                         alt={ `affiche de ${detail.name}` } 
                         onClick={ () => displayTrailer() }
                    /> 
                </div>

                { type === "tv" ? <h1> {detail.name} </h1> : <h1> {detail.title} </h1> }

                {/* VIDEO */}
                { detail.videos.results.map( (result) => result.type === "Trailer" && 
                    <div className="video-container" key={result.id} hidden={displayVideo}>
                        <YoutubeEmbed embedId={result.key} />
                    </div>
                    )
                }

                {/* TIME & VOTES  */}
                <div className="details-content ">
                    { type !== "tv" && <p><i className="fas fa-clock"></i> {detail.runtime} mins </p> }
                    <p><i className="fas fa-star"> </i> {detail.vote_average} (imDb)</p>
                </div>

                {/* GENRE - REL - SEASONS */}
                <div className="details-content">
                    <h2> Release date <br/></h2>
                    <p> { type === "tv" ? detail.last_air_date : detail.release_date}</p>
                </div>
                <div className="details-content">
                    <h2> Genres </h2><br/>
                    { detail.genres.map( (genre) => <p key={`genre-${genre.id}`} >  {genre.name}  </p> ) }
                    
                    { type === "tv" && (detail.seasons.length === 1 ? <h2>1 season</h2> : <h2> {detail.seasons.length} seasons </h2>) } 
                    {/* [ todo ] add function : display details of onClick season(s) */}
                </div>

                {/* SYNOPSIS */}
                <div className="details-content ">
                    <h2> Synopsis </h2>
                    <p> {detail.overview} </p>
                </div>

                {/* REL MOVIE */}
                <div className="details-content">
                    <h2 className="details-subtitle">Related movies</h2>
                </div>

            </article>
            )
        }
        </>
    )
}

export default Details;