import React from 'react';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

import styles from './postScreenStyle';
import { DATA } from './../../shared/data';
import { THEME } from './../../shared/variables/theme';

interface Props {
  navigation: NavigationStackProp;
}
interface Params {
  postId: string;
  postDate: string;
}

const PostScreen: NavigationStackScreenComponent<Params, Props> = ({
  navigation,
}) => {
  const postId = navigation.getParam('postId');

  const post = DATA.find(p => p.id === postId);

  const handlerRemove = () => {
    Alert.alert(
      'Удаление поста',
      'Удалить?',
      [
        {
          text: 'отменить',

          style: 'cancel',
        },
        {
          text: 'удалить',
          style: 'destructive',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: post && post.img }} />
      <View style={styles.textWrapp}>
        <Text style={styles.textContent}>{post && post.text}</Text>
      </View>
      <Button
        title='удалить'
        color={THEME.DANGER_COLOR}
        onPress={handlerRemove}
      />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const postDate = navigation.getParam('postDate');
  const date = new Date(postDate).toLocaleDateString();
  return {
    headerTitle: `пост от ${date}`,
  };
};

export default PostScreen;
