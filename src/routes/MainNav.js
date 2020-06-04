import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashBoardStack from './DashboardStack';
import Detail from '../views/Tables/Detail';

const MainDrawer = createDrawerNavigator();

function MainNavigation() {
  return (
    <MainDrawer.Navigator initialRouteName="dashboardStack">
      <MainDrawer.Screen
        name="dashboardStack"
        component={DashBoardStack}
        options={{
          title: 'Phòng Bàn',
        }}
      />
      <MainDrawer.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Hỗ Trợ',
        }}
      />
    </MainDrawer.Navigator>
  );
}

export default MainNavigation;
