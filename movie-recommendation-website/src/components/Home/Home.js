import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from '../../components/Ana-de-Armas-Famous-Actress-Featureflash.jpg';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPerson);
  }, []);

  async function getTrending(mediaType, func) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2UxNzM5ZmY3MDY4NzVmZDM2NmQzNjY4ZDZjY2IzNiIsIm5iZiI6MTcyODg5OTcxOC4wODU2NTEsInN1YiI6IjY3MGNlODVmYjE1ZDk3YjFhOTNjZmMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ddxxN6AQoGGkR-85Z_PfcOzimYXmYfhsXa-QJEsEak",
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
      options
    );
    const data = await response.json();

    func(data.results);
  }
  return (
    <>
      <div className="row mt-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr mb-3 w-25"></div>
            <h2 className="h4 fw-bold">
              Trending <br />
              Movies <br /> to watch right now
            </h2>
            <p className="py-3">Most watched movies by days</p>
            <div className="brdr mt-1 w-100 mb-3"></div>
          </div>
        </div>

        {trendingMovies.slice(0, 10).map((movie, index) => (
          <Link to={'/MovieDetails/'+movie.id+'/'+movie.media_type} className="col-md-2">
            <div className="movie position-relative">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie poster"
              ></img>
              <h6 className="mt-2 fw-bold text-center">{movie.title}</h6>
              <div className="vote p-2 text-center position-absolute top-0 end-0 ">  {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 7.3}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="row py-5 mt-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr mb-3 w-25"></div>
            <h2 className="h4 fw-bold">
              Trending <br />
              Tv shows <br /> to watch right now
            </h2>
            <p className="py-3">Most watched shows by days</p>
            <div className="brdr mt-3 w-100"></div>
          </div>
        </div>

        {trendingTv.slice(0, 10).map((tv, index) => (
           <Link to={'/MovieDetails/'+tv.id+'/'+tv.media_type} className="col-md-2 mt-3">
            <div className="tv position-relative">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                alt="tv poster"
              ></img>
              <h6 className="mt-2 text-center fw-bold">{tv.name}</h6>
              <div className="vote p-2 text-center position-absolute top-0 end-0 "> {tv.vote_average > 0 ? tv.vote_average.toFixed(1) : 7.4}</div>
            </div>
           </Link>
        ))}
      </div>

      <div className="row py-5 mt-2" >
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr mb-3 w-25"></div>
            <h2 className="h4 fw-bold">
              Trending <br />
              people <br /> to watch right now
            </h2>
            <p className="py-3">Most watched persons by days</p>
            <div className="brdr mt-3 w-100"></div>
          </div>
        </div>

        {trendingPerson.slice(0, 10).map((person, index) => (
  <div className="col-md-2 mt-3" key={person.id || index}>
    <div className="person">
      {person.profile_path ? (
        <img
          className="w-100"
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={`${person.name} profile`}
        />
      ) : (
        <div  style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={avatar}
          alt=""
          className="w-100"/>
        </div>
      )}
      <h6 className="mt-2 text-center fw-bold">{person.name}</h6>
    </div>
  </div>
))}

      </div>
    </>
  );
}
