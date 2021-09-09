import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const EditMeeting = (props) => {
  const {
    location: { state: meeting },
  } = props;

  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amountPeople, setAmountPeole] = useState(0);
  const [assistants, setAssistants] = useState("");

  const cancel = () => {
    setRedirect(true);
  };

  let edited = {
    name,
    date,
    time,
    amountPeople,
    assistants,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let datas = {};
    if (edited.name) {
      datas.name = edited.name;
    }
    if (edited.date) {
      datas.date = edited.date;
    }
    if (edited.time) {
      datas.time = edited.time;
    }
    if (edited.amountPeople) {
      datas.amountPeople = edited.amountPeople;
    }
    if (edited.assistants) {
      datas.assistants = edited.assistants;
    }
    await fetch(
      `https://gestor-puestos.herokuapp.com/api/meeting/${meeting.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    setRedirect(true);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion de la Reunion</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={assistants}
              placeholder="Coloca los asistentes separados por comas ( , ) que quieras agregar a la reunión..."
              onChange={(e) => setAssistants(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={name}
              placeholder={`Nombre de la Reunion: ${meeting.name}`}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              className="form-control w-100 mt-2"
              name={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder={`Fecha de la Reunion: ${meeting.date}`}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder={`Hora de la Reunion: ${meeting.time}`}
            />
            <input
              type="number"
              className="form-control w-100 mt-2"
              name={amountPeople}
              onChange={(e) => setAmountPeole(e.target.value)}
              placeholder={`Cantidad maxima de personas por reunion: ${meeting.amountPeople}`}
            />
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
            {redirect ? <Redirect to="/meetings" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditMeeting;
