import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import dataContext from "../context/Data/dataContext";

function ListItem(props) {
  const host = "http://localhost:5000";
  const { name, poster, size, type, created_by } = props;
  const data = useContext(dataContext);
  const { setListpreview } = data;
  let navigate = useNavigate();

  const handleClick = async (name) => {
    const response = await fetch(`${host}/fetchlistsbyuser/${name}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setListpreview(data[0].List);
    navigate("/playlist");
  };

  return (
    <div
      onClick={() => handleClick(name)}
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
          src={`${poster}`}
          className="card-img-top"
          alt="sorry not available"
          style={{ height: "300px", width: "13rem" }}
        />
        <div className="card-body">
          <h5 className="card-title mt-3" style={{ height: "20px" }}>
            {name.length <= 30 ? name : `${name.slice(0, 32)}...`}
          </h5>
          <div>Size : {size}</div>
          <div>Type : {type}</div>
          {created_by && <div>Created by : {created_by}</div>}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
