import React from 'react';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './mainScreenStyle';

import { Data } from '../../shared/interfaces/data';
import { DATA } from '../../shared/data';

import PostList from '../../shared/components/PostList/PostList';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

interface Props {
  navigation: NavigationStackProp;
}

const MainScreen: NavigationStackScreenComponent<{}, Props> = ({
  navigation,
}) => {
  const handleOpenPost = (post: Data) => {
    navigation.navigate('Post', {
      postId: post.id,
      postDate: post.date,
      booked: post.booked,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostList dataProps={DATA} onOpen={handleOpenPost} />
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Блог',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName='ios-camera'
        title='take photo'
        onPress={() => navigation.push('Create')}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName='ios-menu'
        title='drawer menu'
        onPress={navigation.openDrawer}
      />
    </HeaderButtons>
  ),
});

export default MainScreen;
