// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// Tabs
import AppTabs from './navigation/AppTabs';

// Screens
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DevMenuScreen from './screens/DevMenu';
import MatchEndScreen from './screens/MatchEndScreen';
import MatchInfoScreen from './screens/MatchInfoScreen';
import PayScreen from './screens/PayScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// --- Option A (simple): keep local type and ADD 'Settings' ---
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  EditProfile: undefined;
  MatchEnd?: { matchId?: string };
  MatchInfo?: { matchId?: string };
  Payment?: { matchId?: string };
  DevMenu: undefined;
  Settings: undefined; // ✅ add this
};

// --- Option B (recommended): delete the local type above and instead do ---
// import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    'PlusJakarta-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakarta-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),

    // aliases so existing styles keep working
    'PlusJakarta-Medium': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakarta-SemiBold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakarta-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),

    // alias Inter -> PlusJakarta (you used Inter in a few places)
    Inter: require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
        {/* Auth */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Tabs */}
        <Stack.Screen name="MainTabs" component={AppTabs} />

        {/* Extra stack screens */}
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
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MatchInfo" component={MatchInfoScreen} />
        <Stack.Screen name="Payment" component={PayScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
