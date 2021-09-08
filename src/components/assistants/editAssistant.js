import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import assistantContext from "../../context/assistant/assistantContext";

const EditAssistant = () => {
  const asistenteContext = useContext(assistantContext);
  const { asistente } = asistenteContext;
  const { adress, email, telf } = asistente;
  const [redirect, setRedirect] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const cancel = () => {
    setRedirect(true);
  };

  let edited = {
    adress: direccion,
    telf: telefono,
    email: correo,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let datas = {};
    if (edited.adress) {
      datas.adress = edited.adress;
    }
    if (edited.telf) {
      datas.telf = edited.telf;
    }
    if (edited.email) {
      datas.email = edited.email;
    }
    const data = await fetch(
      `https://gestor-puestos.herokuapp.com/api/assistant/${asistente._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    await data.json();
    setRedirect(true);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion del Asistente</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={direccion}
              placeholder={`Direccion: ${adress}`}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder={`Telefono: ${telf}`}
            />
            <input
              type="email"
              className="form-control w-100 mt-2"
              name={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder={`Correo Electronico: ${email}`}
            />
            {/* <input
              type="checkbox"
              className=" mt-2 mt-2"
              name={miembro}
              checked={member}
              onChange={memberChange}
            />{" "}
            Miembro de la Iglesia */}
            <br /> <br /> <br />
            <button type="submit" className="btn btn-success btn-block m-3">
              Editar
            </button>
            <button
              type="button"
              onClick={cancel}
              className="btn btn-secondary btn-block"
            >
              Cancelar
            </button>
            {redirect ? <Redirect to="/assistants" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditAssistant;
