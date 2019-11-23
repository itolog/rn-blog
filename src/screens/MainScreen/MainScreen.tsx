import React from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

import styles from './mainScreenStyle';

import { Data } from '../../shared/interfaces/data';
import { DATA } from '../../shared/data';

import Post from '../../components/Post/Post';

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
    navigation.navigate('Post', { postId: post.id, postDate: post.date });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.wrappList}
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: IData) => {
          return <Post item={item} onOpen={handleOpenPost} />;
        }}
      />
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: 'blog',
};

export default MainScreen;
