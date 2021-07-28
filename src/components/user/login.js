import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setUserMain }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setUser({
      ...user,
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
    setUserMain(user);
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
                placeholder="Introduce your Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
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
            <Link to="/create-user" className="">
              Sign up
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
