import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../Views/LoginScreen';

import {AuthContext} from '../Contexts/AuthContext';

const authStack = createStackNavigator();

export default function AuthStack() {
  const context = useContext(AuthContext);

  const restoreToken = async () => {
    try {
      let token = await AsyncStorage.getItem('accessToken');
      context.setLogin(token ? true : false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <authStack.Navigator initialRouteName="LoginScreen">
      {!context.isLogin ? (
        <authStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
        />
      ) : (
        <authStack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
        />
      )}
    </authStack.Navigator>
  );
}
