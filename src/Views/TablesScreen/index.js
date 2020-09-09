import React, {useEffect, useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TableList from './TableList';
import {socket} from '../../Connect';
import color from '../../Utils/Color';
import Loader from '../../Components//Modal/Loader';
import {TablesContext} from '../../Contexts/TablesContext';
const Tab = createMaterialTopTabNavigator();

function TablesScreen() {
  const context = useContext(TablesContext);
  const listTable = context.tables;
  //use TablesContext to render each tab screen with their conditions
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const tables = new Array(30)
      .fill({})
      .map((item, index) => ({...item, Table: index + 1}));

    socket.emit('allBill');
    socket.on('allBillResult', (bills) => {
      let tempTables = [...tables];
      //have bills not payed yet
      if (bills.length > 0) {
        for (let item of bills) {
          let index = item.Table - 1;
          tempTables[index] = {...tempTables[index], ...item};
        }
      }
      context.updateTables(tempTables);
      setLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          opacity: 0.9,
          backgroundColor: color.primary,
        },
        inactiveTintColor: 'white',
        activeTintColor: color.secondary,
        labelStyle: {
          fontFamily: 'MavenPro-Medium',
        },
        pressColor: color.primary,
        pressOpacity: 0.9,
      }}>
      {/* all tables */}

      <Tab.Screen
        name="allTables"
        options={{
          title: 'Tất Cả',
        }}>
        {() => <TableList listTable={listTable} />}
      </Tab.Screen>

      <Tab.Screen
        name="servingTables"
        options={{
          title: 'Sử Dụng',
        }}>
        {() => (
          <TableList
            listTable={listTable.filter((item) => Object.keys(item).length > 1)}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="emptyTables"
        options={{
          title: 'Còn Trống',
        }}>
        {() => (
          <TableList
            listTable={listTable.filter(
              (item) => Object.keys(item).length === 1,
            )}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TablesScreen;
