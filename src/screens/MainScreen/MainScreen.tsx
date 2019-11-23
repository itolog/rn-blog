import React from 'react';
import { FlatList } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './mainScreenStyle';

import { Data } from '../../shared/interfaces/data';
import { DATA } from '../../shared/data';

import Post from '../../components/Post/Post';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

interface Props {
  navigation: NavigationStackProp;
}

interface IData {
  item: Data;
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
      <FlatList
        style={styles.wrappList}
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: IData) => {
          return <Post item={item} onOpen={handleOpenPost} />;
        }}
      />
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = {
  headerTitle: 'Блог',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName='ios-camera'
        title='take photo'
        onPress={() => console.log('select')}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        iconName='ios-menu'
        title='drawer menu'
        onPress={() => console.log('select')}
      />
    </HeaderButtons>
  ),
};

export default MainScreen;
