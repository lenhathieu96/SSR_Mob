import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TableList from './TableList';

const Tab = createMaterialTopTabNavigator();

function Dashboard() {
  const [listTable, setListTable] = useState([]);

  useEffect(() => {
    let table = [];
    for (let i = 0; i < 30; i++) {
      table.push(i);
    }
    setListTable(table);
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
        {() => <TableList data={listTable} />}
      </Tab.Screen>
      <Tab.Screen
        name="emptyTables"
        options={{
          title: 'Còn Trống',
        }}>
        {() => <TableList data={listTable} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Dashboard;
