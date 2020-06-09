import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TableList from './TableList';
import socket from '../../Connect/SocketIO';
import color from '../../utils/Color';
const Tab = createMaterialTopTabNavigator();

function Dashboard({route}) {
  const bill_id = route.params;
  const [listTable, setListTable] = useState([]);

  useEffect(() => {
    const tables = new Array(30)
      .fill({})
      .map((item, index) => ({...item, Table: index + 1}));

    socket.emit('allBill');
    socket.on('allBillResult', (bills) => {
      console.log('data changed');
      let tempTables = [...tables];
      if (bills.length > 0) {
        for (let item of bills) {
          let index = item.Table - 1;
          tempTables[index] = {...tempTables[index], ...item};
        }
      }
      setListTable(tempTables);
    });
  }, []);

  const onChangeTable = (index_table) => {
    console.log(index_table);
  };

  return (
    <Tab.Navigator
      initialRouteName={!bill_id ? 'allTables' : 'emptyTables'}
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
      {!bill_id ? (
        <Tab.Screen
          name="allTables"
          options={{
            title: 'Tất Cả',
          }}>
          {() => <TableList data={listTable} />}
        </Tab.Screen>
      ) : null}

      {!bill_id ? (
        <Tab.Screen
          name="servingTables"
          options={{
            title: 'Sử Dụng',
          }}>
          {() => (
            <TableList
              data={listTable.filter((item) => Object.keys(item).length > 1)}
            />
          )}
        </Tab.Screen>
      ) : null}

      <Tab.Screen
        name="emptyTables"
        options={{
          title: 'Còn Trống',
        }}>
        {() => (
          <TableList
            data={listTable.filter((item) => Object.keys(item).length === 1)}
            onChangeTable={onChangeTable}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Dashboard;
