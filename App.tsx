import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <AuthProvider>
      <NavigationContainer>
        {token ? <MainTabNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
