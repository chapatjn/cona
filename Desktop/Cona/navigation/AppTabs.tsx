// navigation/AppTabs.tsx
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import ConaTabBar from '../components/ConaTabBar';

import HomeScreen from '../screens/HomeScreen';
import AllMatchesScreen from '../screens/AllMatchesScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileTabWrapper from '../screens/ProfileTabWrapper';

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
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 84,
        },
      }}
      tabBar={(props: BottomTabBarProps) => <ConaTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="AllMatches" component={AllMatchesScreen} options={{ title: 'Buscar' }} />
      <Tab.Screen name="Create" component={CreateScreen} options={{ title: 'Crear' }} />
      <Tab.Screen name="Profile" component={ProfileTabWrapper} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
