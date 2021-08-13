import { useState } from "react";
import assistantContext from "./assistantContext";

const AssistantState = (props) => {
  const [asistente, setAsistente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    miembro: "",
    direccion: "",
  });
  return (
    <assistantContext.Provider
      value={{
        asistente,
        setAsistente,
      }}
    >
      {props.children}
    </assistantContext.Provider>
  );
};

export default AssistantState;
