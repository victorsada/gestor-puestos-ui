import React, { Fragment, useEffect, useState } from "react";

const Assistants = ({ auth }) => {
  const token = localStorage.getItem("token");
  const [assistant, setAssistant] = useState({
    totalAssistant: 0,
    assistant: [],
  });

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
      // console.log(participant);
      setAssistant(participant);
    };
    getAssistants();
  }, [token]);
  console.log(assistant);
  return (
    <Fragment>
      {token || auth ? (
        <div className="row">
          <h1>From assistants</h1>
          {JSON.stringify(assistant.assistant)}
        </div>
      ) : (
        <h1>Non Authorization</h1>
      )}
    </Fragment>
  );
};

export default Assistants;
