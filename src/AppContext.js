import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
