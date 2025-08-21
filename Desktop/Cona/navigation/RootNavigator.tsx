// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import AppTabs from './AppTabs';
import MatchInfoScreen from '../screens/MatchInfoScreen';
import PayScreen from '../screens/PayScreen';

type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  MatchInfo: undefined;
  Payment: { matchId?: string } | undefined;
  Pay: { matchId?: string } | undefined; // alias just in case
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={AppTabs} />
      <Stack.Screen name="MatchInfo" component={MatchInfoScreen} />
      <Stack.Screen name="Payment" component={PayScreen} />
      <Stack.Screen name="Pay" component={PayScreen} />
    </Stack.Navigator>
  );
}
