import React from "react";
import dataContext from "./dataContext";
import { useState } from "react";

const DataState = (props) => {
  const [text, setText] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieID, setMovieID] = useState("");
  const [poster, setPoster] = useState("");
  const [listpreview, setListpreview] = useState([]);
  const [page, setPage] = useState(1);
  const [res, setRes] = useState(0);
  const [user, setUser] = useState("");

  //!.creating a new list
  const createList = async (title, name) => {
    const response = await fetch(`/createNewPlayList${name}/${movieID}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, poster }),
    });
  };

  //add itemp to an exixting list
  const addToExisting = async (id) => {
    const response = await fetch(`/addToPlaylist/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ movieID }),
    });
  };

  const playListpreview = async (title) => {
    const response = await fetch(`/fetchlistsbyuser/${title}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setListpreview(data.List);
  };

  return (
    <dataContext.Provider
      value={{
        text,
        setText,
        movies,
        setMovies,
        movieID,
        setMovieID,
        createList,
        setPoster,
        addToExisting,
        playListpreview,
        listpreview,
        setListpreview,
        page,
        setPage,
        res,
        setRes,
        user,
        setUser,
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
};

export default DataState;
