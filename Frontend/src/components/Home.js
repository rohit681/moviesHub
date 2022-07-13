import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import dataContext from "../context/Data/dataContext";

const Home = () => {
  const data = useContext(dataContext);
  let history = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setText } = data;

  const getData = async () => {
    const response = await fetch(`/fetchlists/public`, {
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
        created_by: item.name,
      });
      setList(arr);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setText("");
      getData();
    } else {
      history("/");
    }
  }, []);

  return (
    <div>
      <div className="row mx-3 my-3">
        {!loading ? (
          list.map((item) => {
            return (
              <>
                <ListItem
                  key={item.id}
                  id={item.id}
                  name={item.title}
                  poster={item.poster}
                  size={item.movies.length}
                  type={item.type}
                  created_by={item.created_by}
                />
              </>
            );
          })
        ) : (
          <div
            className="container spinner-border my-3 text-light"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        )}
      </div>
    </div>
  );
};

export default Home;
