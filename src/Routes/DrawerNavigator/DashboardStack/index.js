import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';

import TablesScreen from '../../../Views/TablesScreen';
import DetailScreen from '../../../Views/DetailScreen';
import MenuScreen from '../../../Views/MenuScreen';

import color from '../../../Utils/Color';
import {TablesProvider} from '../../../Contexts/TablesContext';
import {CurrentTableProvider} from '../../../Contexts/CurrentTableContext';

const dashboardStack = createStackNavigator();

function DashboardStack() {
  return (
    <TablesProvider>
      <CurrentTableProvider>
        <dashboardStack.Navigator initialRouteName="tables">
          <dashboardStack.Screen
            name="tables"
            component={TablesScreen}
            options={({navigation}) => ({
              title: 'Danh Sách Phòng Bàn',
              headerStyle: {
                backgroundColor: color.primary,
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
                  backgroundColor={color.primary}
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
                backgroundColor: color.primary,
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
                  backgroundColor={color.primary}
                  size={24}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
        </dashboardStack.Navigator>
      </CurrentTableProvider>
    </TablesProvider>
  );
}
export default DashboardStack;
