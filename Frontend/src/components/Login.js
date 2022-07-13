import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/Alert/alertContext";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const context = useContext(alertContext);

  const { setAlert } = context;
  const onLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("User", data.name);
      history("/home");
      setAlert({
        message: "Logged in successfully",
        type: `Hello ${data.name}`,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    } else {
      setAlert({ message: "Invalid Credentials", type: "Error" });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/home");
    }
  }, []);
  return (
    <div className="container d-flex justify-content-center my-5">
      <div
        className="container card"
        style={{
          width: "30rem",
          height: "30rem",
          backgroundColor: "rgba(33,37,41,1)",
          color: "white",
          boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 15%)",
        }}
      >
        <div className="card-body container my-3">
          <h5 className="card-title d-flex justify-content-center">Login</h5>

          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={onLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
