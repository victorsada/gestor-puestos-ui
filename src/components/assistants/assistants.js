import React, { Fragment, useEffect, useState } from "react";
import Assistant from "./assistant";

const Assistants = ({ auth }) => {
  const token = localStorage.getItem("token");
  const [assistant, setAssistant] = useState([]);

  useEffect(() => {
    const getAssistants = async () => {
      const url = "http://localhost:4000/api/assistant";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const participant = await response.json();
      setAssistant(participant);
    };
    getAssistants();
  }, [token]);
  return (
    <Fragment>
      {token || auth ? (
        <div className="mt-3">
          <h1>Lista de Participantes</h1>

          <table className="mt-3 table table-striped">
            <thead className="bg-primary table-dark ">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Miembro</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {assistant.length === 0 ? (
                <div className="mt-5 ">
                  <h1>Ooops, no hay participantes :'C </h1>
                  <h2>Ve a crear uno ^.^</h2>
                </div>
              ) : (
                assistant.map((participant) => (
                  <Assistant key={participant._id} participant={participant} />
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No estas autorizado, ¡ve y logueate! :D</h1>
      )}
    </Fragment>
  );
};

export default Assistants;
