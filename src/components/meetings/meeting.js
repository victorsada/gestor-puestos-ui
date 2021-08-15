import React, { Fragment } from "react";

const Meeting = ({ meeting }) => {
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
            // onClick={handleEdit}
            className="btn btn-outline-secondary m-1"
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger font-weight-bold "
            // onClick={() => handleDelete()}
          >
            Eliminar
          </button>

          <button
            type="button"
            className="font-weight-bold btn btn-outline-info  m-1"
            // onClick={() => handleMore(_id)}
          >
            Ver más
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default Meeting;
