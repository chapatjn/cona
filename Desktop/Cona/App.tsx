// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import SplashScreen from './screens/SplashScreen';
import AppTabs from './navigation/AppTabs';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlusJakarta-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakarta-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakarta-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
    Inter: require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={AppTabs} />
        {/* Auth modals (sit above the tabs) */}
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
