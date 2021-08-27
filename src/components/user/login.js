import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({ user, setUser, setAuth }) => {
  useEffect(() => {
    if (user === undefined) {
      return;
    }

    const api = async () => {
      const url = "https://gestor-puestos.herokuapp.com/api/user/login";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const createdUser = await response.json();

        if (response.status === 404) {
          alert(createdUser.message);
          setData({
            email: "",
            password: "",
          });
          return;
        } else if (response.status === 409) {
          alert(createdUser.message);
          setData({
            email: "",
            password: "",
          });
          return;
        }
        setRedirect(true);
        localStorage.setItem("token", createdUser.token);
        const token = localStorage.getItem("token");
        setAuth(token);
      } catch (error) {
        console.log(error);
      }
    };
    api();
    // eslint-disable-next-line
  }, [user]);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmti = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password === "") {
      setError(true);
      return;
    }
    setError(false);
    setUser(data);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div class="d-flex justify-content-center">
          <form onSubmit={handleSubmti}>
            <div className="card p-5 m-5">
              <h3 className="card-title">Login</h3>
              <input
                type="email"
                className="form-control "
                name="email"
                value={email}
                placeholder="Introduce your Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Introduce your password"
                className="form-control mt-2"
                onChange={handleChange}
              />
              {error ? (
                <p className="p-1 mt-3 bg-danger rounded text-light">
                  Email and Password are required
                </p>
              ) : null}
              <button
                type="submit"
                className="mt-5 btn btn-block btn-primary text-light"
              >
                Sign in
              </button>
            </div>
            <Link
              to="/create-user"
              className=" btn btn-block btn-info text-light w-75"
            >
              Sign up
            </Link>
            {redirect ? <Redirect to="/home" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
