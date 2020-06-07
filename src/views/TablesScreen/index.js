import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TableList from './TableList';
import socket from '../../Connect/SocketIO';

const Tab = createMaterialTopTabNavigator();

function Dashboard() {
  const tables = new Array(30)
    .fill({})
    .map((item, index) => ({...item, Table: index + 1}));

  const [listTable, setListTable] = useState([]);

  useEffect(() => {
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

  return (
    <Tab.Navigator
      initialRouteName="allTable"
      tabBarOptions={{
        tabStyle: {
          opacity: 0.9,
          backgroundColor: '#283593',
        },
        inactiveTintColor: 'white',
        activeTintColor: '#e78200',
        labelStyle: {
          fontFamily: 'MavenPro-Medium',
        },
        pressColor: '#283593',
        pressOpacity: 0.9,
      }}>
      <Tab.Screen
        name="allTable"
        options={{
          title: 'Tất Cả',
        }}>
        {() => <TableList data={listTable} />}
      </Tab.Screen>
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
      <Tab.Screen
        name="emptyTables"
        options={{
          title: 'Còn Trống',
        }}>
        {() => (
          <TableList
            data={listTable.filter((item) => Object.keys(item).length === 1)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Dashboard;
