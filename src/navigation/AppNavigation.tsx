import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../shared/variables/theme';

import MainScreen from '../screens/MainScreen/MainScreen';
import PostScreen from '../screens/PostScreen/PostScreen';
import BookedScreen from './../screens/BookedScreen/BookedScreen';
import AboutScreen from './../screens/AboutScreen/AboutScreen';
import CreateScreen from './../screens/CreateScreen/CreateScreen';

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : 'white',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
  },
};

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen,
  },
  navigatorOptions,
);

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Post: PostScreen,
  },
  navigatorOptions,
);

const bottomConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'все',
      tabBarIcon: (info: any) => (
        <Ionicons name='ios-albums' size={25} color={info.tintColor} />
      ),
    },
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'избранное',
      tabBarIcon: (info: any) => (
        <Ionicons name='ios-star' size={25} color={info.tintColor} />
      ),
    },
  },
};

const BottomNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomConfig, {
        activeColor: '#fff',
        shifting: true,
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
      })
    : createBottomTabNavigator(bottomConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR,
        },
      });

const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen,
  },
  navigatorOptions,
);

const Createnavigator = createStackNavigator(
  {
    Create: CreateScreen,
  },
  navigatorOptions,
);

const MainNavigator = createDrawerNavigator(
  {
    PostScreen: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: 'Главная',
      },
    },
    AboutScreen: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'О приложении',
      },
    },
    CreateScreen: {
      screen: Createnavigator,
      navigationOptions: {
        drawerLabel: 'Создать пост',
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'inconsolata-bold',
      },
    },
  },
);

export const AppNavigation = createAppContainer(MainNavigator);
