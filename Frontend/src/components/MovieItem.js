import React from "react";
import "../css/movieItem.css";

function MovieItem(props) {
  // eslint-disable-next-line
  const { id, name, poster_path, year, getInfo } = props;

  return (
    <div className="col-md-3 my-3 hov" style={{ width: "20%" }}>
      <div
        className="card"
        style={{
          width: "13.1rem",
          height: "30rem",
          backgroundColor: "rgba(33,37,41,1)",
          color: "white",
        }}
      >
        <img
          src={`${poster_path}`}
          className="card-img-top"
          alt="sorry not available"
          style={{ height: "300px", width: "13rem" }}
        />
        <div className="card-body">
          <div>
            <i className="fa-solid fa-star"> {year} </i>
          </div>
          <h5 className="card-title mt-3" style={{ height: "50px" }}>
            {name.length <= 30 ? name : `${name.slice(0, 32)}...`}
          </h5>
        </div>
        <i
          class="fa-solid fa-circle-info mb-3 mx-3 d-flex justify-content-end"
          onClick={() => getInfo(id, poster_path)}
        ></i>
      </div>
    </div>
  );
}

export default MovieItem;
