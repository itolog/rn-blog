import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

import styles from './mainScreenStyle';

interface Props {
  navigation: NavigationStackProp;
}

const MainScreen: NavigationStackScreenComponent<{}, Props> = ({
  navigation,
}) => {
  const goTo = (): void => {
    navigation.navigate('Post');
  };

  return (
    <View style={styles.container}>
      <Text>MainScreens</Text>
      <Button title='go to post' onPress={goTo} />
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: 'blog',
};

export default MainScreen;
