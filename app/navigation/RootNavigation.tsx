import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {LoginScreen, HomeScreen, TodoListScreen} from '@/screens';
import {storage, STORAGE_KEYS} from '@/controller/storage';

export type RootStackParamList = {
  GuestNavigation: NavigatorScreenParams<GuestStackParamList>;
  AppNavigation: NavigatorScreenParams<AppStackParamList>;
};

export type GuestStackParamList = {
  LoginScreen: undefined;
};

export type AppStackParamList = {
  HomeScreen: undefined;
  TodoListScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const GuestStack = createNativeStackNavigator<GuestStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const GuestNavigation = () => {
  return (
    <GuestStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <GuestStack.Screen name="LoginScreen" component={LoginScreen} />
    </GuestStack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      <AppStack.Screen name="TodoListScreen" component={TodoListScreen} />
    </AppStack.Navigator>
  );
};

const RootNavigation = () => {
  const [isAuth, setIsAuth] = React.useState(
    !!storage.getString(STORAGE_KEYS.TOKEN),
  );

  const chooseScreen = useMemo(() => {
    return isAuth ? (
      <RootStack.Screen name={'AppNavigation'} component={AppNavigation} />
    ) : (
      <RootStack.Screen name={'GuestNavigation'} component={GuestNavigation} />
    );
  }, [isAuth]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {/* {chooseScreen} */}
        <RootStack.Screen
          name={'GuestNavigation'}
          component={GuestNavigation}
        />
        <RootStack.Screen name={'AppNavigation'} component={AppNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
