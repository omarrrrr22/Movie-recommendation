import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-5" to="/">
            <span className="text-info">NET</span> WATCH
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="home" id="home">
                  Home
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="people">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tv">
                  TV
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <form class="d-flex" role="search">
                <input class="form-control me-3 w-200" type="search" placeholder="Search...." aria-label="Search"/>
            </form>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-facebook mx-2"></i>
                  <i className="fab fa-instagram mx-2"></i>
                  <i className="fab fa-twitter mx-2"></i>
                  <i className="fab fa-spotify mx-2"></i>
                  <i className="fab fa-youtube mx-2"></i>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}