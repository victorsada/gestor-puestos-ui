import React, { Fragment } from "react";
import Nav from "./nav";

const Home = () => {
  return (
    <Fragment>
      <Nav />
      <div className="mt-5">
        <h2>Bienvenidos</h2>
      </div>
    </Fragment>
  );
};

export default Home;
