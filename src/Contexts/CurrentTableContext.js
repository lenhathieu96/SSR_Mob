import React, {useState, createContext} from 'react';

export const CurrentTableContext = createContext({});

export function CurrentTableProvider(props) {
  const [currentTable, setCurrentTable] = useState({});

  return (
    <CurrentTableContext.Provider
      value={{
        data: currentTable,
        setData: setCurrentTable,
      }}>
      {props.children}
    </CurrentTableContext.Provider>
  );
}
