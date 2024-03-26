import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AnimalShelterScreen from '../screens/AnimalShelterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? 'rgb(112, 82, 157)' : 'rgba(112, 82, 157, 0.5)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AnimalShelter"
        component={AnimalShelterScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="location-dot"
              size={24}
              color={focused ? 'rgb(112, 82, 157)' : 'rgba(112, 82, 157, 0.5)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              size={24}
              color={focused ? 'rgb(112, 82, 157)' : 'rgba(112, 82, 157, 0.5)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
