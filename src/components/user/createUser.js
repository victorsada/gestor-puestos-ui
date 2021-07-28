import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const CreateUser = ({ setCreateUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
  });
  const { name, email, password, rol } = user;

  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmti = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password === "") {
      setError(true);
      return;
    }
    setError(false);
    setCreateUser(user);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div class="d-flex justify-content-center">
          <form onSubmit={handleSubmti}>
            <div className="card p-5 m-5">
              <h3 className="card-title">Create User</h3>
              <input
                type="text"
                className="form-control "
                name="name"
                placeholder="Introduce your name..."
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Introduce your email..."
                className="form-control mt-2"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Introduce your password..."
                className="form-control mt-2"
                onChange={handleChange}
              />

              <select
                onChange={handleChange}
                className="form-control mt-2"
                name="rol"
              >
                <option value="">--Rol--</option>
                <option value="admin">Admin</option>
                <option value="ugier">Ugier</option>
              </select>

              {error ? (
                <p className="p-1 mt-3 bg-danger rounded text-light">
                  Name, Email and Password are required
                </p>
              ) : null}
              <button
                type="submit"
                className="mt-5 btn btn-block btn-primary text-light"
              >
                Create User
              </button>
            </div>
            <Link to="/" className="">
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateUser;
