import React, { Fragment, useState, useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";
import assistantContext from "../../context/assistant/assistantContext";

const Assistant = ({ participant, setRefresh }) => {
  const asistenteContext = useContext(assistantContext);
  const { setAsistente } = asistenteContext;
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [del, setDel] = useState(false);
  const { adress, name, sex, telf, email, birthday, member, _id } = participant;
  const [edit, setEdit] = useState(false);

  const handleMore = async (id) => {
    setModal(true);
    await fetch(`https://gestor-puestos.herokuapp.com/api/assistant/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  };

  const deleteAssistant = async (id) => {
    await fetch(`https://gestor-puestos.herokuapp.com/api/assistant/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    setRefresh(true);
  };

  const handleDelete = async (id) => {
    setDel(true);
  };

  const handleEdit = () => {
    setEdit(true);
    setAsistente(participant);
  };

  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {name} </b>
        </td>
        <td>
          <span className="font-weight-bold"> {telf}</span>
        </td>
        <td>{member ? <span> Si </span> : <p>No</p>}</td>
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
            onClick={() => handleMore(_id)}
          >
            Ver más
          </button>
        </td>
      </tr>
      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Informacion del Asistente</h4>
        </ModalHeader>
        <ModalBody>
          <ul>
            <li className="text-capitalize ">
              <b>Nombre: </b> <i>{name}</i>
            </li>
            <li className="text-capitalize">
              <b>Direccion: </b>
              <i>{adress ? adress : "No especifica"}</i>
            </li>
            <li className="text-capitalize">
              <b>Telefono: </b>
              <i>{telf ? telf : "No especifica"}</i>
            </li>
            <li className="text-capitalize">
              <b>Sexo: </b>
              <i>{sex ? sex : "No especifica"} </i>
            </li>
            <li className="text-capitalize">
              <b>Email: </b>
              <i>{email ? email : "No especifica"}</i>
            </li>
            <li className="text-capitalize">
              <b>Fecha de Nacimiento: </b>
              <i> {birthday ? birthday : "No especifica"}</i>
            </li>
            <li className="text-capitalize">
              <b>Miembro: </b>
              <i>{member ? "Si es miembro" : "No es miembro"}</i>
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
            <b className="text-capitalize">{name}</b>?{" "}
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteAssistant(_id);
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
        <Redirect to={{ pathname: "/editAssistant", state: participant }} />
      ) : null}
    </Fragment>
  );
};

export default Assistant;
