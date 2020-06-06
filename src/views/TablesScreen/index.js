import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TableList from './TableList';
import socket from '../../Connect/SocketIO';

const Tab = createMaterialTopTabNavigator();

function Dashboard() {
  const [listTable, setListTable] = useState([]);

  useEffect(() => {
    let arr = new Array(30);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = {Table: i + 1};
    }
    socket.emit('allBill');
    socket.on('allBillResult', async (bills) => {
      bills.forEach((item) => {
        const index = item.Table - 1;
        arr[index] = {...arr[index], ...item};
      });
      setListTable(arr);
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
