import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatchInfoScreen from './screens/MatchInfoScreen';


// Import your screens
import HomeScreen from './screens/HomeScreen';
import AllMatchesScreen from './screens/AllMatchesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // smooth transition
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllMatches" component={AllMatchesScreen} />
        <Stack.Screen name="MatchInfo" component={MatchInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
