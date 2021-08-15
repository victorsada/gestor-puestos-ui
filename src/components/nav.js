import React, { Fragment } from "react";
import Logout from "./user/logout";
const Nav = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-nav p-3">
        <a className="margen-left navbar-brand" href="/home">
          Home
        </a>

        <a className="  navbar-brand" href="/meetings">
          <b>Reuniones</b>
        </a>
        <a className="margen-right navbar-brand" href="/assistants">
          Asistentes
        </a>
        <Logout className="margen-right" />
      </nav>
    </Fragment>
  );
};

export default Nav;
