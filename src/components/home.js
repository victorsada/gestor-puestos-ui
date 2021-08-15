import React, { Fragment } from "react";
import Nav from "./nav";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <Fragment>
      <Nav />
      {token ? (
        <div className="mt-5">
          <h2>Bienvenidos</h2>
        </div>
      ) : (
        <h2 className="mt-5">No estas autorizado, ¡ve y logueate!</h2>
      )}
    </Fragment>
  );
};

export default Home;
