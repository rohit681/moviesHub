import React, { useContext, useEffect, useRef, useState } from "react";

import dataContext from "../context/Data/dataContext";
import MovieItem from "./MovieItem";

const PlaylistView = () => {
  const data = useContext(dataContext);
  const { movies, setMovieID, setPoster, listpreview } = data;

  const [list, setList] = useState([]);
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [runtime, setRuntime] = useState("");
  const [genre, setGenre] = useState([]);
  const [rated, setRated] = useState("");
  const [rating, setRating] = useState("");
  const [desc, setDesc] = useState("");
  const [stars, setStars] = useState([]);
  const [writer, setWriter] = useState("");
  const [director, setDirector] = useState("");
  // const list = []
  const getI = async (id, poster) => {
    setMovieID(id);
    setPoster(poster);
    const data = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=3eb19dd`);
    const parsedData = await data.json();
    console.log(parsedData);
    setName(parsedData.Title);
    setImage(parsedData.Poster);
    setYear(parsedData.Year);
    setRated(parsedData.Rated);
    setRating(parsedData.imdbRating);
    setDesc(parsedData.Plot);
    setStars(parsedData.Actors.split(","));
    setWriter(parsedData.Writer);
    setDirector(parsedData.Director);
    let calTimeHour = Math.floor(parsedData.Runtime.split(" ")[0] / 60);
    let calTimeMin = parsedData.Runtime.split(" ")[0] % 60;
    if (calTimeHour !== 0 && parsedData.Runtime !== "N/A") {
      setRuntime(`${calTimeHour}h ${calTimeMin}min`);
    } else if (parsedData.Runtime !== "N/A") {
      setRuntime(`${calTimeMin}Min`);
    }
    setGenre(parsedData.Genre.split(","));
    console.log(genre);
    ref.current.click();
  };

  const getInfo = async () => {
    const arr = [];
    listpreview.map(async (id) => {
      const data = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=3eb19dd`
      );
      let parsedData = await data.json();
      arr.push(parsedData);

      setList(arr);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="row mx-3 my-3">
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ backgroundColor: "#0000004d" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            maxWidth: "calc(600px - 2rem)",
            backgroundColor: "transparent",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "rgba(33,37,41,1)",
              color: "white",
              boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 15%)",
            }}
          >
            <div className="d-flex justify-content-end mx-3 my-3">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body d-flex flex-column">
              <div className="d-flex flex-direction-row">
                <img
                  src={`${image}`}
                  className="card-img-top mx-3"
                  alt="sorry not available"
                  style={{ height: "150px", width: "100px" }}
                />
                <div>
                  <h3>
                    {name.length <= 30 ? name : `${name.slice(0, 32)}...`}{" "}
                  </h3>
                  <div>
                    {year} {runtime !== "" ? `• ${runtime} ` : ""}{" "}
                    {rated !== "N/A" ? `• ${rated}` : ""}
                  </div>
                  <div>
                    {genre[0]} {genre[1] === undefined ? "" : `• ${genre[1]}`}{" "}
                    {genre[2] === undefined ? "" : `• ${genre[2]} `}
                  </div>
                  <div className="d-flex flex-direction-row align-items-center">
                    <i
                      className="fa fa-star checked"
                      style={{ color: "orange", alignItems: "center" }}
                    ></i>{" "}
                    {rating}/10 &nbsp; &nbsp; &nbsp;
                    <div className="rate">
                      {" "}
                      <i class="fa-regular fa-star">Rate</i>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-3 my-3">{desc}</div>
              <div className="mx-3 mt-2">
                <strong>Stars: &nbsp; </strong> {stars[0]}{" "}
                {stars[1] === undefined ? "" : `• ${stars[1]}`}{" "}
                {stars[2] === undefined ? "" : `• ${stars[2]} `}
              </div>
              <div className="mx-3">
                <strong>Writer: &nbsp; </strong> {writer}{" "}
              </div>
              <div className="mx-3">
                <strong>Director: &nbsp; </strong> {director}
              </div>
            </div>
          </div>
        </div>
      </div>
      {list &&
        list.map((movie) => {
          return (
            <>
              <MovieItem
                key={movie.imdbID}
                id={movie.imdbID}
                name={movie.Title ? movie.Title : movie.name}
                poster_path={movie.Poster}
                year={movie.Year}
                getInfo={getInfo}
              />
            </>
          );
        })}
    </div>
  );
};

export default PlaylistView;
