import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";

const Home = () => {
  let history = useNavigate();
  const host = "http://localhost:5000";
  const [list, setList] = useState([]);

  const getData = async () => {
    const response = await fetch(`${host}/fetchlists/public`, {
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
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("success");
      getData();
    } else {
      history("/");
    }
  }, []);

  return (
    <div>
      <div className="row mx-3 my-3">
        {list &&
          list.map((item) => {
            {
              console.log(item);
            }
            return (
              <>
                <ListItem
                  name={item.title}
                  poster={item.poster}
                  size={item.movies.length}
                  type={item.type}
                  created_by={item.created_by}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
