// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// Root flows
import SplashScreen from './screens/SplashScreen';
import AppTabs from './navigation/AppTabs';

// Auth modals
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

// Dev / misc
import DevMenuScreen from './screens/DevMenu';
import MatchEndScreen from './screens/MatchEndScreen';

import MatchInfoScreen from './screens/MatchInfoScreen';
import PayScreen from './screens/PayScreen';

// ---------- Types used across the app ----------
export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;

  // Auth
  SignIn: undefined;
  SignUp: undefined;

  // Dev / misc
  DevMenu: undefined;
  MatchEnd: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Load fonts once for the whole app
  const [fontsLoaded] = useFonts({
    'PlusJakarta-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakarta-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakarta-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* Launch */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Main app (tabs) */}
        <Stack.Screen name="MainTabs" component={AppTabs} />

        {/* Auth (presented modally above tabs) */}
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

        {/* Dev utilities */}
        <Stack.Screen
          name="DevMenu"
          component={DevMenuScreen}
          options={{ headerShown: true, title: 'Dev Menu' }}
        />
        <Stack.Screen
          name="MatchEnd"
          component={MatchEndScreen}
          options={{ headerShown: true, title: 'Match End' }}
        />

        <Stack.Screen name="MatchInfo" component={MatchInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment"  component={PayScreen}        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
