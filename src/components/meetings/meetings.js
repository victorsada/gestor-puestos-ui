import React, { Fragment, useEffect, useState } from "react";
import Meeting from "./meeting";
import Nav from "../nav";

const Meetings = () => {
  const token = localStorage.getItem("token");
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getMeetings = async () => {
      const meeting = await fetch("http://localhost:4000/api/meeting", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const response = await meeting.json();
      setMeetings(response.meeting);
    };
    getMeetings();
  }, []);

  return (
    <Fragment>
      <Nav />
      {token ? (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-11">
              <h1>Lista de Reuniones</h1>
            </div>
          </div>
          <div className="col-md-1"></div>

          <table className="mt-3 table table-striped">
            <thead className="bg-primary table-dark ">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {meetings.length === 0 ? (
                <div className="mt-5 ">
                  <h1>Oops, no hay reuniones</h1>
                  <h2>¡Ve a crear una!</h2>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <Meeting key={meeting.id} meeting={meeting} />
                ))
              )}
            </tbody>
          </table>
          <div className="derecha">
            <button
              type="button"
              // onClick={() => setModal(true)}
              className="btn btn-outline-success"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <h2 className="mt-5">No estas autorizado, ¡ve y logueate!</h2>
      )}
    </Fragment>
  );
};

export default Meetings;
