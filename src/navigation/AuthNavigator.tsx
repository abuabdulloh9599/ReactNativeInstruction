import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { StatusBar } from 'react-native';
import { useAuthStore } from '../store/authStore';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const hasRegistered = useAuthStore(state => state.hasRegistered);

  return (
    <>
      <StatusBar backgroundColor={'#000'} />

      <Stack.Navigator initialRouteName={hasRegistered ? 'Login' : 'Register'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
