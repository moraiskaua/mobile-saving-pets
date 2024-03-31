import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import MainTabNavigator from './navigation/MainTabNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const { token } = useContext(AuthContext);

  console.log(token);
  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Main;
