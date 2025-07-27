import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';


// Import your screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AllMatchesScreen from './screens/AllMatchesScreen';
import MatchInfoScreen from './screens/MatchInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllMatches" component={AllMatchesScreen} />
        <Stack.Screen name="MatchInfo" component={MatchInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
