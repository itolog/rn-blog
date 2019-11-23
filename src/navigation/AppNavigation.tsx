import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../shared/variables/theme';

import MainScreen from '../screens/MainScreen/MainScreen';
import PostScreen from '../screens/PostScreen/PostScreen';
import BookedScreen from './../screens/BookedScreen/BookedScreen';

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
    },
  },
);

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
    },
  },
);

const BottomNavigator = createBottomTabNavigator(
  {
    Post: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: info => (
          <Ionicons name='ios-albums' size={25} color={info.tintColor} />
        ),
      },
    },
    Booked: {
      screen: BookedNavigator,
      navigationOptions: {
        tabBarIcon: info => (
          <Ionicons name='ios-star' size={25} color={info.tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: THEME.MAIN_COLOR,
    },
  },
);

export const AppNavigation = createAppContainer(BottomNavigator);
