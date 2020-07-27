import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DashBoardStack from './DashboardStack';
import DetailScreen from '../../Views/DetailScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../../Contexts/AuthContext';

const MainDrawer = createDrawerNavigator();

function DrawerNavigator() {
  const context = useContext(AuthContext);

  const logout = () => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    context.setLogin(false);
  };

  return (
    <MainDrawer.Navigator
      initialRouteName="dashboardStack"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => logout()} />
          </DrawerContentScrollView>
        );
      }}>
      <MainDrawer.Screen
        name="dashboardStack"
        component={DashBoardStack}
        options={{
          title: 'Phòng Bàn',
        }}
      />
      <MainDrawer.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Hỗ Trợ',
        }}
      />
    </MainDrawer.Navigator>
  );
}

export default DrawerNavigator;
