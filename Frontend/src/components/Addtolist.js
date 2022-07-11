import React, { useContext, useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import "../css/addToList.css";
import dataContext from "../context/Data/dataContext";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/Alert/alertContext";

const Addtolist = () => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const data = useContext(dataContext);
  const context = useContext(alertContext);
  const { setAlert } = context;
  const { createList, fetchLists, addToExisting } = data;
  const ref = useRef(null);
  let navigate = useNavigate();
  const host = "http://localhost:5000";

  const createLists = () => {
    ref.current.click();
  };

  const addToExis = (e, id) => {
    e.preventDefault();
    addToExisting(id);
    navigate("/addtolist");
    setAlert({ message: "Added To successfully", type: "Success" });
    console.log(alert);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const addTo = (e, name) => {
    e.preventDefault();
    createList(title, name);
    navigate("/addtolist");
    setAlert({ message: "List created successfully", type: "Success" });
    console.log(alert);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const getData = async () => {
    const response = await fetch(`${host}/fetchlists`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    const arr = [];
    data.map((item) => {
      arr.push({
        title: item.title,
        id: item._id,
        movies: item.List,
        poster: item.poster,
        type: item.type,
      });
    });
    setList(arr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
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
              <h5 className="card-title d-flex">Save To Playlist...</h5>
              <div class="btn-group my-3">
                <button
                  type="button"
                  class="btn btn-outline-success dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add To Playlist
                </button>
                <ul class="dropdown-menu ddm">
                  {list &&
                    list.map((item) => (
                      <li>
                        <button
                          className="text-align-center my-1 listbtn"
                          onClick={(e) => addToExis(e, item.id)}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <form>
                <div className="modal-footer" style={{ padding: "0" }}>
                  <h5
                    className="card-title d-flex mt-3"
                    style={{ width: "100%" }}
                  >
                    Create New Playlist...
                  </h5>
                  <input
                    type="text"
                    name="name"
                    className="form-control my-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div class="btn-group mb-3" style={{ width: "100%" }}>
                    <button
                      type="button"
                      class="btn btn-outline-success dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Privacy
                    </button>
                    <ul class="dropdown-menu ddm">
                      <li>
                        <button
                          className="text-align-center my-1 listbtn"
                          onClick={(e) => addTo(e, "Public")}
                        >
                          Public
                        </button>
                      </li>
                      <li>
                        <button
                          className="text-align-center my-1 listbtn"
                          onClick={(e) => addTo(e, "Private")}
                        >
                          Private
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <button
          type="button"
          class="btn btn-outline-success mx-1 my-2"
          style={{ width: "98%" }}
          onClick={createLists}
        >
          Create PlayList
        </button>
      </div>
      <div className="row mx-3 my-3">
        {list &&
          list.map((item) => {
            return (
              <>
                <ListItem
                  name={item.title}
                  poster={item.poster}
                  size={item.movies.length}
                  type={item.type}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Addtolist;
