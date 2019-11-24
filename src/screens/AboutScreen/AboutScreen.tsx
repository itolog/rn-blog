import React from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

interface Props {
  navigation: NavigationStackProp;
}

const AboutScreen: NavigationStackScreenComponent<{}, Props> = () => {
  return (
    <SafeAreaView>
      <Text>AboutScreen</Text>
    </SafeAreaView>
  );
};

AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'О приложении',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName='ios-menu'
        title='drawer menu'
        onPress={navigation.toggleDrawer}
      />
    </HeaderButtons>
  ),
});
export default AboutScreen;
