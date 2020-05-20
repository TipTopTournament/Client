import React, { useState, createContext } from "react";

export const ManagerNavBarContext = createContext({
  selected: false,
  setSelected: () => {},
});

export const ManagerNavBarProvider = (props) => {
  const setSelected = (bool) => {
    setState({ state, selected: bool });
  };

  const initState = {
    selected: false,
    setSelected: setSelected,
  };

  const [state, setState] = useState(initState);

  return (
    <ManagerNavBarContext.Provider value={state}>
      {props.children}
    </ManagerNavBarContext.Provider>
  );
};
