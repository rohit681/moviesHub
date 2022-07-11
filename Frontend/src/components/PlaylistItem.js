import React from "react";
import "../css/movieItem.css";

function PlaylistItem(props) {
  const { id, name, poster_path, year } = props;

  return (
    <div
      //   onClick={() => handleClick(name)}
      className="col-md-3 my-3 hov"
      style={{ width: "20%" }}
    >
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
          <i className="fa-solid fa-star"> {year} </i>
          <h5 className="card-title mt-3" style={{ height: "50px" }}>
            {name.length <= 30 ? name : `${name.slice(0, 32)}...`}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
