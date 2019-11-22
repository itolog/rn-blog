import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import { THEME } from '../shared/variables/theme';

import MainScreen from '../screens/MainScreen/MainScreen';
import PostScreen from '../screens/PostScreen/PostScreen';

const AppNavigator = createStackNavigator(
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

export default createAppContainer(AppNavigator);
