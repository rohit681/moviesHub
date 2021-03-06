import { useContext, useEffect } from "react";
import dataContext from "../context/Data/dataContext";
import Movies from "./Movies";

export default function Search() {
  const data = useContext(dataContext);
  const { text, page, setPage, movies, setMovies, res, setRes } = data;
  const onclicked = async (where) => {
    if (where === "next") {
      const data = await fetch(
        `https://www.omdbapi.com/?s=${text}&page=${page + 1}&apikey=3eb19dd`
      );
      const parsedData = await data.json();

      setPage(page + 1);
      setRes(res - 10);
      setMovies(parsedData.Search);
    } else {
      const data = await fetch(
        `https://www.omdbapi.com/?s=${text}&page=${page - 1}&apikey=3eb19dd`
      );
      const parsedData = await data.json();
      setPage(page - 1);
      setRes(res + 10);
      setMovies(parsedData.Search);
    }
  };
  useEffect(() => {}, [page]);

  return (
    <div className="home" style={{ backgroundColor: "rgba(33,37,41,1)" }}>
      <Movies />
      <div className="container d-flex justify-content-between">
        <button
          disabled={page === 1 ? true : false}
          type="button"
          className="btn btn-dark"
          onClick={() => onclicked("prev")}
        >
          &laquo; prev
        </button>
        <button
          disabled={res <= 0 || movies.length < 10 ? true : false}
          type="button"
          className="btn btn-dark"
          onClick={() => onclicked("next")}
        >
          next &raquo;
        </button>
      </div>
    </div>
  );
}
