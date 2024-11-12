import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported

export default function TrendingTv() {
  const [trendingTv, setTrendingTv] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrending("tv", setTrendingTv);
  }, []);

  async function getTrending(mediaType, func) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2UxNzM5ZmY3MDY4NzVmZDM2NmQzNjY4ZDZjY2IzNiIsIm5iZiI6MTcyODg5OTcxOC4wODU2NTEsInN1YiI6IjY3MGNlODVmYjE1ZDk3YjFhOTNjZmMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ddxxN6AQoGGkR-85Z_PfcOzimYXmYfhsXa-QJEsEak", // Replace with your actual API key
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trending TV shows");
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
              TV Shows <br /> to Watch Right Now
            </h2>
            <p className="py-3">Most watched shows by days</p>
            <div className="brdr mt-3 w-100"></div>
          </div>
        </div>

        {error && <p className="text-danger">Error: {error}</p>}
        {trendingTv.length === 0 ? (
          <p>Loading trending TV shows...</p>
        ) : (
          trendingTv.slice(0, 20).map((show) => (
            <Link
              to={`/MovieDetails/${show.id}/${show.media_type}`}
              key={show.id}
              className="col-md-2"
            >
              <div className="movie position-relative">
                {show.poster_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    alt={`Poster of ${show.name}`} 
                  />
                ) : (
                  <div className="w-100" style={{ height: "300px", background: "#ccc" }}>
                    No Image Available
                  </div>
                )}
                <h6 className="mt-2 text-center">{show.name}</h6>
                <div className="vote p-2 text-center position-absolute top-0 end-0">
                {show.vote_average > 0 ? show.vote_average.toFixed(1) : 8.1}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
