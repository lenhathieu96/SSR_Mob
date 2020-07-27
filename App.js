import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Routes';
import {AuthProvider} from './src/Contexts/AuthContext';
const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
