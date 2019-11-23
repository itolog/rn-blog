import React from 'react';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './postScreenStyle';
import { DATA } from './../../shared/data';
import { THEME } from './../../shared/variables/theme';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

interface Props {
  navigation: NavigationStackProp;
}
interface Params {
  postId: string;
  postDate: string;
  booked: boolean;
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
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const postDate = navigation.getParam('postDate');
  const booked = navigation.getParam('booked');
  const date = new Date(postDate).toLocaleDateString();

  const iconName = booked ? 'ios-star' : 'ios-star-outline';
  return {
    headerTitle: `пост от ${date}`,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          iconName={iconName}
          title='take photo'
          onPress={() => console.log('select')}
        />
      </HeaderButtons>
    ),
  };
};

export default PostScreen;
