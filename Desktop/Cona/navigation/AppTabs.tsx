// navigation/AppTabs.tsx
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import ConaTabBar from '../components/ConaTabBar';

import HomeScreen from '../screens/HomeScreen';
import AllMatchesScreen from '../screens/AllMatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEmptyScreen from '../screens/ProfileEmptyScreen';

// Temporary placeholder; replace later
function CreateScreen() {
  return null;
}

export type MainTabParamList = {
  Home: undefined;
  AllMatches: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // Make default bar invisible so your custom ConaTabBar “floats”
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 84, // leaves space so content isn't covered by the floating bar
        },
      }}
      tabBar={(props: BottomTabBarProps) => <ConaTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="AllMatches"
        component={AllMatchesScreen}
        options={{ title: 'Buscar' }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Crear' }}
      />
     <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />

     
    </Tab.Navigator>
  );
}
