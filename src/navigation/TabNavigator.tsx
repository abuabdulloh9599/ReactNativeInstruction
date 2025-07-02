import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Home, User, Settings } from 'lucide-react-native';
import { lightColors, darkColors } from '../theme/colors';
import { useThemeStore } from '../store/themeStore';
import { StatusBar } from 'react-native';

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
  (route: RouteProp<TabParamList, keyof TabParamList>) =>
  ({ color, size }: { color: string; size: number }) => {
    const Icon = getTabIcon(route.name);
    return <Icon color={color} size={size} />;
  };

export default function TabNavigator() {
  const theme = useThemeStore(state => state.theme);
  const colors = theme === 'dark' ? darkColors : lightColors;
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <StatusBar backgroundColor={colors.background} barStyle={barStyle} />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: renderTabIcon(route),
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabInactive,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
          tabBarStyle: {
            backgroundColor: colors.background,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}
