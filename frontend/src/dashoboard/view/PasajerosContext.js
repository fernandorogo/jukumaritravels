import React, { createContext, useContext, useState } from "react";

const PasajerosContext = createContext();

export function PasajerosProvider({ children }) {
  const [clientes, setClientes] = useState([]);

  const addClientes = (newClientes) => {
    setClientes((prevClientes) => [...prevClientes, ...newClientes]);
  };

  return (
    <PasajerosContext.Provider value={{ clientes, addClientes }}>
      {children}
    </PasajerosContext.Provider>
  );
}

export function usePasajeros() {
  return useContext(PasajerosContext);
}
