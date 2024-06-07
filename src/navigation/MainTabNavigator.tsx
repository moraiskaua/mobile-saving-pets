// navigation/MainTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AnimalShelterScreen from '../screens/AnimalShelterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import NewReportScreen from '../screens/NewReportScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewReport" component={NewReportScreen} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home-outline"
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
              name="location-outline"
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
              name="person-outline"
              size={24}
              color={focused ? 'rgb(112, 82, 157)' : 'rgba(112, 82, 157, 0.5)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
