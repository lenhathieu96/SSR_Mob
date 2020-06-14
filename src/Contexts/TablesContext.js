import React, {useState, createContext} from 'react';

export const TablesContext = createContext([]);

export function TablesProvider(props) {
  const [tableList, setTableList] = useState([]);

  return (
    <TablesContext.Provider
      value={{
        tables: tableList,
        updateTables: setTableList,
      }}>
      {props.children}
    </TablesContext.Provider>
  );
}
