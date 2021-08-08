import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Logout from "../user/logout";
import Assistant from "./assistant";

const Assistants = ({ auth }) => {
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  const [assistant, setAssistant] = useState([]);
  const [modal, setModal] = useState(false);
  const [member, setMember] = useState(false);
  const [error, setError] = useState(false);
  const [asistente, setAsistente] = useState({
    name: "",
    email: "",
    birthday: "",
    adress: "",
    telf: "",
    sex: "",
  });
  const { name, email, birthday, adress, telf } = asistente;
  asistente.member = member;

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
    setRefresh(false);
  }, [token, refresh]);

  const handleSubmit = async () => {
    if (name.trim() === "") {
      setError(true);
      return;
    }
    await fetch("http://localhost:4000/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(asistente),
    });
    setAsistente({
      name: "",
      email: "",
      birthday: "",
      adress: "",
      telf: "",
      sex: "",
    });
    setError(false);
    setRefresh(true);
    setModal(false);
  };

  const handleChange = (e) => {
    setAsistente({
      ...asistente,
      [e.target.name]: e.target.value,
    });
  };
  const memberChange = (e) => {
    setMember(!member);
  };
  return (
    <Fragment>
      {token || auth ? (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-11">
              <h1>Lista de Participantes</h1>
            </div>
            <div className=" col-md-1">
              <Logout />
            </div>
          </div>
          <div className="col-md-1"></div>

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
                  <Assistant
                    key={participant._id}
                    participant={participant}
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
              className="btn btn-success"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <h1>No estas autorizado, ¡ve y logueate! :D</h1>
      )}
      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea un Asistente</h4>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Nombre y Apellido del Asistente..."
              value={name}
              onChange={handleChange}
            />
            {error ? (
              <p className="p-2 mt-2 bg-danger text-light">
                <b> El nombre es obligatorio</b>
              </p>
            ) : null}
            <input
              type="email"
              className="form-control mt-2"
              name="email"
              placeholder="Email del Asistente..."
              value={email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              name="adress"
              placeholder="Direccion del Asistente..."
              value={adress}
              onChange={handleChange}
            />
            <input
              type="date"
              className="form-control mt-2"
              name="birthday"
              placeholder="Fecha de nacimiento del Asistente..."
              value={birthday}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              name="telf"
              placeholder="Telefono del Asistente..."
              value={telf}
              onChange={handleChange}
            />
            <input
              type="radio"
              className="mt-2"
              name="sex"
              onChange={handleChange}
              value="masculino"
            />{" "}
            Masculino{" "}
            <input
              type="radio"
              className="mt-2"
              name="sex"
              onChange={handleChange}
              value="femenino"
            />{" "}
            Femenino <br />
            <input
              type="checkbox"
              className=" mt-2"
              name="member"
              checked={member}
              onChange={memberChange}
            />{" "}
            Miembro de la Iglesia
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

export default Assistants;
