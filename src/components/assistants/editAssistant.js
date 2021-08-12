import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import assistantContext from "../../context/assistant/assistantContext";

const EditAssistant = () => {
  const asistenteContext = useContext(assistantContext);
  const { asistente } = asistenteContext;
  const { adress, email, telf } = asistente;
  const [redirect, setRedirect] = useState(false);
  const [editAssistant, setEditAssistant] = useState({
    direccion: "",
    telefono: "",
    correo: "",
  });
  const { direccion, telefono, correo } = editAssistant;

  const cancel = () => {
    setRedirect(true);
  };

  const handleChange = (e) => {
    setEditAssistant({
      ...editAssistant,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion del Asistente</h4>
          <form>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={direccion}
              placeholder={adress}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={telefono}
              placeholder={telf}
              onChange={handleChange}
            />
            <input
              type="email"
              className="form-control w-100 mt-2"
              name={correo}
              placeholder={email}
              onChange={handleChange}
            />
            <input
              type="checkbox"
              className=" mt-2 mt-2"
              name="miembro"

              //onChange={memberChange}
            />{" "}
            Miembro de la Iglesia
            <br /> <br /> <br />
            <button className="btn btn-success btn-block m-3">Editar</button>
            <button onClick={cancel} className="btn btn-secondary btn-block">
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
