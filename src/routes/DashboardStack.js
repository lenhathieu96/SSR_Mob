import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';

import TablesScreen from '../views/TablesScreen';
import DetailScreen from '../views/DetailScreen';
import MenuScreen from '../views/MenuScreen';

const dashboardStack = createStackNavigator();

function DashboardStack() {
  return (
    <dashboardStack.Navigator initialRouteName="tables">
      <dashboardStack.Screen
        name="tables"
        component={TablesScreen}
        options={({navigation}) => ({
          title: 'Danh Sách Phòng Bàn',
          headerStyle: {
            backgroundColor: '#283593',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'MavenPro-Bold',
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon.Button
              name="bars"
              backgroundColor="#283593"
              size={24}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <dashboardStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />

      <dashboardStack.Screen
        name="Menu"
        component={MenuScreen}
        options={({navigation}) => ({
          title: 'Danh Sách Món',
          headerStyle: {
            backgroundColor: '#283593',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'MavenPro-Bold',
            fontSize: 22,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="chevron-left"
              backgroundColor="#283593"
              size={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </dashboardStack.Navigator>
  );
}
export default DashboardStack;
