import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/Alert/alertContext";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(alertContext);
  const { setAlert } = context;
  let history = useNavigate();
  const onSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem("token", data.authToken);
      history("/");
    } else {
      setAlert({ message: "User already Exist", type: "Error" });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  };
  return (
    <div className="container d-flex justify-content-center my-5 ">
      <div
        className="container card "
        style={{
          width: "30rem",
          height: "30rem",
          backgroundColor: "rgba(33,37,41,1)",
          color: "white",
          boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 15%)",
        }}
      >
        <div className="card-body container my-3 ">
          <h5 className="card-title d-flex justify-content-center">Sign Up</h5>

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
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
              onClick={onSignup}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
