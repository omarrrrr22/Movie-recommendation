import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

export default function Login() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
  }, []);

  async function getTrending(mediaType, func) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2UxNzM5ZmY3MDY4NzVmZDM2NmQzNjY4ZDZjY2IzNiIsIm5iZiI6MTcyODg5OTcxOC4wODU2NTEsInN1YiI6IjY3MGNlODVmYjE1ZDk3YjFhOTNjZmMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ddxxN6AQoGGkR-85Z_PfcOzimYXmYfhsXa-QJEsEak", // Use your API key here
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      const data = await response.json();
      func(data.results);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr mb-3 w-25"></div>
            <h2 className="h4">
              Trending <br />
              Movies <br /> to watch right now
            </h2>
            <p className="py-3">Most watched movies by days</p>
            <div className="brdr mt-3 w-100"></div>
          </div>
        </div>

        {error && <p className="text-danger">Error: {error}</p>}
        {trendingMovies.length === 0 ? (
          <p>Loading trending movies...</p>
        ) : (
          trendingMovies.slice(0, 20).map((movie) => (
            <Link to={`/MovieDetails/${movie.id}/${movie.media_type}`} key={movie.id} className="col-md-2">
              <div className="movie position-relative">
                {movie.poster_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`Poster of ${movie.title}`} // More descriptive alt text
                  />
                ) : (
                  <div className="w-100" style={{ height: "300px", background: "#ccc" }}>
                    No Image Available
                  </div>
                )}
                <h6 className="mt-2 text-center">{movie.title}</h6>
                <div className="vote p-2 text-center position-absolute top-0 end-0">
                {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 8.2}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
