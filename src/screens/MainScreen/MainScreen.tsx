import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { NavigationStackProp } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './mainScreenStyle';

import { Data } from '../../shared/interfaces/data';

import PostList from '../../shared/components/PostList/PostList';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';
import Loader from '../../shared/UI/Loader/Loader';

// STORE IMPORTS
import { AppState } from '../../store';
import { Actions } from '../../store/post/actions';
import { getAllPosts } from '../../store/post/selectors';
// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    allPosts: getAllPosts(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadPosts: () => dispatch(Actions.getPosts()),
});

interface IProps {
  navigation: NavigationStackProp;
}
type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IProps;

const MainScreen = ({ navigation, loadPosts, allPosts }: Props) => {
  const handleOpenPost = (post: Data) => {
    navigation.navigate('Post', {
      postId: post.id,
      postDate: post.date,
      booked: post.booked,
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (allPosts.length === 0) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <PostList dataProps={allPosts} onOpen={handleOpenPost} />
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = ({ navigation }: Props) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
