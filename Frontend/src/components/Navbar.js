import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from "../context/Alert/alertContext";
import dataContext from "../context/Data/dataContext";
export default function Navbar() {
  let location = useLocation();
  useEffect(() => {}, [location]);
  let navigate = useNavigate();
  const context = useContext(alertContext);
  const data = useContext(dataContext);

  const { setAlert } = context;
  const { text, setText, setMovies, setRes, res } = data;

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    setAlert({ message: "User Logged Out successfully", type: "Logout" });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `https://www.omdbapi.com/?s=${text}&page=1&apikey=3eb19dd`
    );
    const parsedData = await data.json();

    setMovies(parsedData.Search);
    setRes(parsedData.totalResults - 10);
    navigate("/search");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "1",
        borderBottom: "1px solid black",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            MoviesHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  to="/home"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/addtolist" ? "active" : ""
                  }`}
                  to="/addtolist"
                >
                  Playlists
                </Link>
              </li>
            </ul>
            <form
              className={localStorage.getItem("token") ? `d-flex` : `d-none`}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                className="btn btn-outline-success mx-2"
                type="submit"
                onClick={onSearch}
              >
                Search
              </button>
            </form>
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/">
                  <button
                    className="btn btn-outline-success mx-1"
                    type="submit"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn btn-outline-success mx-1"
                    type="submit"
                  >
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button className="btn btn-outline-success" onClick={onLogout}>
                  Logout
                </button>
                <h5 className="mx-3" style={{ color: "White" }}>
                  {localStorage.getItem("User")}
                </h5>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
