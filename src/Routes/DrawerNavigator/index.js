import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DashBoardStack from './DashboardStack';
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
            <DrawerItem label="Đăng Xuất" onPress={() => logout()} />
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
        component={DashBoardStack}
        options={{
          title: 'Hỗ Trợ',
        }}
      />
    </MainDrawer.Navigator>
  );
}

export default DrawerNavigator;
