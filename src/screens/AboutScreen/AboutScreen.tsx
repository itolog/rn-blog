import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface Props {
  navigation: NavigationStackProp;
}

const AboutScreen: NavigationStackScreenComponent<{}, Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Версия приложении 1.0.2</Text>
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
