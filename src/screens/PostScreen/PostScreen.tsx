import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './postScreenStyle';
import { THEME } from './../../shared/variables/theme';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';
import Loader from '../../shared/UI/Loader/Loader';

// STORE IMPORTS
import { AppState } from '../../store';
import { Actions } from '../../store/post/actions';
import { getAllPosts, getBookedPosts } from '../../store/post/selectors';
// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    allPosts: getAllPosts(state),
    bookedPosts: getBookedPosts(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toogleBooked: (id: string) => dispatch(Actions.toggleBooked(id)),
  removePost: (id: string) => dispatch(Actions.removePost(id)),
});

interface Params {
  postId: string;
  postDate: string;
  booked: boolean;
}

interface IProps {
  navigation: NavigationStackProp;
}
type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps &
  Params;

const PostScreen = ({
  navigation,
  allPosts,
  toogleBooked,
  bookedPosts,
  removePost,
}: Props) => {
  const postId = navigation.getParam('postId');

  const [post, setPost] = useState();

  const booked = bookedPosts.some(post => post.id === postId);

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
          onPress: () => {
            removePost(postId);
            navigation.navigate('Main');
          },
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  useEffect(() => {
    const getPostById = allPosts.find(p => p.id === postId);
    setPost(getPostById);
  }, [allPosts]);

  const handleToogler = useCallback(() => {
    console.log(postId);
    toogleBooked(postId);
  }, [toogleBooked, postId]);

  useEffect(() => {
    navigation.setParams({ handleToogler });
  }, []);

  if (!post) {
    return <Loader />;
  }

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

PostScreen.navigationOptions = ({ navigation }: Props) => {
  const postDate = navigation.getParam('postDate');
  const booked = navigation.getParam('booked');
  const toogleBooked = navigation.getParam('handleToogler');
  const date = new Date(postDate).toLocaleDateString();

  const iconName = booked ? 'ios-star' : 'ios-star-outline';
  return {
    headerTitle: `пост от ${date}`,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item iconName={iconName} title='take photo' onPress={toogleBooked} />
      </HeaderButtons>
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
