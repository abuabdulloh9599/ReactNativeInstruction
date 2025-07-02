import React from 'react';
import { useColorScheme } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Home, User, Settings } from 'lucide-react-native';
import { lightColors, darkColors } from '../theme/colors';

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
    isDark: boolean,
  ): BottomTabNavigationOptions['tabBarIcon'] =>
  ({ color, size }) => {
    const Icon = getTabIcon(route.name);
    return <Icon color={color} size={size} />;
  };

export default function TabNavigator() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark ? darkColors : lightColors;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabIcon(route, isDark),
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabInactive,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.text,
        },
        tabBarStyle: {
          backgroundColor: theme.background,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
