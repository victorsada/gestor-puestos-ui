import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Meeting from "./meeting";
import Nav from "../nav";

const Meetings = () => {
  const token = localStorage.getItem("token");
  const [meetings, setMeetings] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [reunion, setReunion] = useState({
    name: "",
    date: "",
    time: "",
    amountPeople: "",
  });
  const { name, date, time } = reunion;

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
    setRefresh(false);
  }, [refresh]);

  const handleChange = (e) => {
    setReunion({
      ...reunion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || date === "" || time === "") {
      setError(true);
      return;
    }

    const data = await fetch("http://localhost:4000/api/meeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reunion),
    });
    const response = await data.json();
    setModal(false);
    setError(false);
    setRefresh(true);
  };

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
              {!meetings ? (
                <div className="mt-5 ">
                  <h1>Oops, no hay reuniones</h1>
                  <h2>¡Ve a crear una!</h2>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <Meeting
                    key={meeting.id}
                    meeting={meeting}
                    setRefresh={setRefresh}
                  />
                ))
              )}
            </tbody>
          </table>
          <div className="derecha">
            <button
              type="button"
              onClick={() => setModal(true)}
              className="btn btn-outline-success"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <h2 className="mt-5">No estas autorizado, ¡ve y logueate!</h2>
      )}
      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea una Reunion</h4>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {error ? (
              <p className="p-2 mt-2 bg-danger text-light">
                <b> Nombre, fecha y hora son obligatorios</b>
              </p>
            ) : null}
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre de la reunion..."
              onChange={handleChange}
            />

            <input
              type="date"
              className="form-control mt-2"
              name="date"
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control mt-2"
              name="time"
              placeholder="Hora de la reunion..."
              onChange={handleChange}
            />

            <input
              type="number"
              className="form-control mt-2"
              placeholder="Cantidad maxima de participantes"
              name="amountPeople"
              onChange={handleChange}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-success btn-block"
            type="button"
            onClick={handleSubmit}
          >
            Crear
          </button>
          <button
            onClick={() => {
              setModal(false);
              setError(false);
            }}
            className="btn btn-block btn-danger"
            type="button"
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Meetings;
