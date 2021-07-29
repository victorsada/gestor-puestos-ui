import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

const CreateUser = ({ user, setUser }) => {
  useEffect(() => {
    if (user === undefined) {
      return;
    }
    const url = "http://localhost:4000/api/user";

    const api = async () => {
      const createdUser = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (createdUser.status === 409) {
        alert("Ooops, this user already exist!");
        setData({
          name: "",
          email: "",
          password: "",
          rol: "",
        });
      } else if (createdUser.status === 201) {
        alert("User created successfuly");
        setData({
          name: "",
          email: "",
          password: "",
          rol: "",
        });
        setRedirect(true);
      }
    };

    api();
    // eslint-disable-next-line
  }, [user]);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    rol: "",
  });
  const { name, email, password, rol } = data;
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
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
    setUser(data);
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
                value={name}
                placeholder="Introduce your name..."
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Introduce your email..."
                className="form-control mt-2"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                value={password}
                placeholder="Introduce your password..."
                className="form-control mt-2"
                onChange={handleChange}
              />

              <select
                onChange={handleChange}
                className="form-control mt-2"
                name="rol"
                value={rol}
              >
                <option value="">-- Rol --</option>
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

            <Link to="/" className=" btn btn-block btn-info text-light w-75">
              Sign in
            </Link>

            {redirect ? <Redirect to="/" /> : null}
            {redirect ? setUser(undefined) : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateUser;
