import React, { createContext, useState, useEffect, useContext } from "react";

const AcceptContext = createContext([{}, () => {}]);

const useStore = () => {
  const [state, setState] = useContext(StateContext);

  return [state, setState];
};

const StateContext = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <AcceptContext.Provider value={[state, setState]}>
      {children}
    </AcceptContext.Provider>
  );
};

export default StateContext;
