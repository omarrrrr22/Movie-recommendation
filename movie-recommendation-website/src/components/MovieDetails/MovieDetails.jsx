import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const params = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similar, setSimilar] = useState([]);

  const fetchItemData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2UxNzM5ZmY3MDY4NzVmZDM2NmQzNjY4ZDZjY2IzNiIsIm5iZiI6MTcyODg5OTcxOC4wODU2NTEsInN1YiI6IjY3MGNlODVmYjE1ZDk3YjFhOTNjZmMxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ddxxN6AQoGGkR-85Z_PfcOzimYXmYfhsXa-QJEsEak",
      },
    };

    try {
      console.log("Media Type:", params.media_type);
      console.log("Item ID:", params.id);

      const detailsUrl = `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`;
      const similarUrl = `https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?language=en-US`;

      const [detailsResponse, similarResponse] = await Promise.all([
        fetch(detailsUrl, options),
        fetch(similarUrl, options),
      ]);

      if (!detailsResponse.ok) {
        const errorData = await detailsResponse.json();
        throw new Error(
          `Error ${detailsResponse.status}: ${errorData.status_message}`
        );
      }

      const detailsData = await detailsResponse.json();
      setItemDetails(detailsData);

      if (!similarResponse.ok) {
        const errorData = await similarResponse.json();
        throw new Error(
          `Error ${similarResponse.status}: ${errorData.status_message}`
        );
      }

      const similarData = await similarResponse.json();
      setSimilar(similarData.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const renderImage = () => {
    switch (params.media_type) {
      case "movie":
      case "tv":
        return itemDetails.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${itemDetails.poster_path}`}
            className="w-100"
            alt={itemDetails.name || "Media Image"}
          />
        ) : (
          <p>No Image Available</p>
        );
      default:
        return <p>No Image Available</p>;
    }
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-3">{renderImage()}</div>
        <div className="col-md-9">
          <h2 className="fw-bold text-info w-50 my-4">
            {itemDetails.title || itemDetails.name}
          </h2>
          <h3 className="every">Everyone ends up in the same damned place.</h3>
          <span className="my_input">Crime</span>
          <span className="my_input">Comdey</span>
          <span className="my_input">Thrilled</span>
          <span className="my_input">Action</span>
          <span className="my_input">Drama</span>

          <p className="mt-4">
            <span className="fw-bold text-info">vote:</span>{" "}
            {itemDetails.vote_average > 0 ? itemDetails.vote_average : 8}
          </p>
          <p className="mt-4">
            <span className="fw-bold text-info">vote count:</span>{" "}
            {itemDetails.vote_average > 0
              ? itemDetails.vote_count
              : 8 * 99}
          </p>
          <p className="mt-4">
            <span className="fw-bold text-info">popularity:</span>{" "}
            {itemDetails.popularity}
          </p>
          <p className="mt-4">
            <span className="fw-bold text-info">release date:</span> {itemDetails.release_date}
          </p>
          <p className="w-75">
            <span className="fw-bold text-info">Summary: </span>
            <br />
            {itemDetails.overview}
          </p>
        </div>
      </div>

      <h3 className="mt-5 mb-5">
        {" "}
        <span className="text-info fw-bold">Similar</span> Items
      </h3>
      <div className="row">
  {similar.map((item) => (
    item.poster_path && (
      <div className="col-md-3" key={item.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          className="w-100"
          alt={item.title || item.name}
        />
        <h5 className="mt-2 text-center fw-bold my-3">{item.title || item.name}</h5>
      </div>
    )
  ))}
</div>
 </>
  );
}
