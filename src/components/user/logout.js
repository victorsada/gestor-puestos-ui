import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [redirect, setRedirect] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setRedirect(true);
  };
  return (
    <Fragment>
      <div>
        <button onClick={logout} className="btn-danger">
          <i class="fa fa-sign-out"></i>
        </button>
      </div>
      {redirect ? <Redirect to="/" /> : null}
    </Fragment>
  );
};

export default Logout;
