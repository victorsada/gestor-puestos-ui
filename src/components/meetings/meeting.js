import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Redirect } from "react-router-dom";

const Meeting = ({ meeting, setRefresh }) => {
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleMore = async (id) => {
    setModal(true);
    await fetch(`https://gestor-puestos.herokuapp.com/api/meeting/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  };

  const handleDelete = (e) => setDel(true);

  const deleteMeeting = async (id) => {
    await fetch(`https://gestor-puestos.herokuapp.com/api/meeting/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    setRefresh(true);
  };

  const handleEdit = () => {
    setEdit(true);
    // setAsistente(participant);
  };

  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {meeting.name} </b>
        </td>
        <td>
          <span className="font-weight-bold">{meeting.date.substr(0, 10)}</span>
        </td>
        <td>{meeting.time}</td>
        <td className="acciones">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary m-1"
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger font-weight-bold "
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>

          <button
            type="button"
            className="font-weight-bold btn btn-outline-info  m-1"
            onClick={() => handleMore(meeting._id)}
          >
            Ver más
          </button>
        </td>
      </tr>
      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Informacion de la Reunion</h4>
        </ModalHeader>
        <ModalBody>
          <ul>
            <li className="text-capitalize ">
              <b>Nombre: </b> <i>{meeting.name}</i>
            </li>
            <li className="text-capitalize">
              <b>Fecha: </b>
              <i>{meeting.date.substr(0, 10)}</i>
            </li>
            <li className="text-capitalize">
              <b>Hora: </b>
              <i>{meeting.time}</i>
            </li>
            <li className="text-capitalize">
              <b>Cantidad Maxima de Personas: </b>
              {meeting.amountPeople ? meeting.amountPeople : "no especifica"}
            </li>
            <li className="text-capitalize">
              <b>Asistentes: </b>
              {/**/}
            </li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setModal(false)}
            className="btn btn-block btn-primary"
            type="button"
          >
            OK
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={del}>
        <ModalHeader>Confirmacion</ModalHeader>
        <ModalBody>
          <p>
            ¿Estas seguro que deseas eliminar a{" "}
            <b className="text-capitalize">{meeting.name}</b>?{" "}
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteMeeting(meeting.id);
              setDel(false);
            }}
            className="btn btn-danger btn-block"
          >
            Si
          </button>
          <button
            onClick={() => setDel(false)}
            className="btn btn-primary btn-block"
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      {edit ? (
        <Redirect to={{ pathname: "/editmeeting", state: meeting }} />
      ) : null}
    </Fragment>
  );
};

export default Meeting;
