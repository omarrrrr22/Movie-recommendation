import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
import avatar from '../../components/Ana-de-Armas-Famous-Actress-Featureflash.jpg'

export default function TrendingPeople() {
  const [trendingPerson, setTrendingPerson] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrending("person", setTrendingPerson); // Change to 'person' to fetch trending people
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
        throw new Error("Failed to fetch trending people");
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
              People <br /> to Watch Right Now
            </h2>
            <p className="py-3">Most watched persons by days</p>
            <div className="brdr mt-3 w-100"></div>
          </div>
        </div>

        {error && <p className="text-danger">Error: {error}</p>}
        {trendingPerson.length === 0 ? (
          <p>Loading trending people...</p>
        ) : (
          trendingPerson.slice(0, 20).map((person) => (
            <Link
              to={`/MovieDetails/${person.id}/${person.media_type}`}
              key={person.id}
              className="col-md-2"
            >
              <div className="person">
                {person.profile_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    alt={`Profile of ${person.name}`} // More descriptive alt text
                  />
                ) : (
                  <div style={{  background: "#ccc" }}>
                   <img 
                   src={avatar}
                   alt=""
                   className="w-100"
                   />
                  </div>
                )}
                <h6 className="mt-2 text-center">{person.name}</h6>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
