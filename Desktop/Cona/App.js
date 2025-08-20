// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

// Screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AllMatchesScreen from './screens/AllMatchesScreen';
import MatchInfoScreen from './screens/MatchInfoScreen';
import ProfileScreen from './screens/ProfileScreen';
import PayScreen from './screens/PayScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync({
          'PlusJakarta-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
          'PlusJakarta-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
          'PlusJakarta-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
          'PlusJakarta-Italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Font loading error:', e);
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#142029' }}>
        <ActivityIndicator size="large" color="#A7EE43" />
      </View>
    );
  }

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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
