import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Home, User, Settings } from 'lucide-react-native';

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const getTabIcon = (routeName: keyof TabParamList) => {
  switch (routeName) {
    case 'Home':
      return Home;
    case 'Profile':
      return User;
    case 'Settings':
      return Settings;
    default:
      return Home;
  }
};

const renderTabIcon =
  (
    route: RouteProp<TabParamList, keyof TabParamList>,
  ): BottomTabNavigationOptions['tabBarIcon'] =>
  ({ color, size }) => {
    const Icon = getTabIcon(route.name);
    return <Icon color={color} size={size} />;
  };

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabIcon(route),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
