import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-info fw-bold">About Us</h5>
            <p>Discover your next favorite film with our curated recommendations! Whether you’re in the mood for a thrilling action, a heartfelt drama, or a laugh-out-loud comedy, we’ve got you covered. Explore a diverse selection of movies that cater to every taste, and let our expert picks guide you to cinematic gems you won't want to miss!</p>

          </div>
          <div className="col-md-4">
            <h5 className="text-info fw-bold">Links</h5>
            <ul className="list-unstyled">
            <li className="nav-item">
                <Link className="nav-link" to="home" id="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  movies
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="tv">
                  tv
                </Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link" to="home">
                  Contact Us
                </Link>
              </li>           
               </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-info fw-bold">Contact Us</h5>
            <p> <span className="text-info fw-bold">Email:</span> info@example.com</p>
            <p><span className="text-info fw-bold">phone:</span> (123) 456-7890</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p>&copy; <span className="text-info fw-bold">2024 ITC COLLEGE</span>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}