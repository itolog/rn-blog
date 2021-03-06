import React from 'react';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from '../MainScreen/mainScreenStyle';

import { DataDB } from '../../shared/interfaces/data';

import PostList from '../../shared/components/PostList/PostList';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

// STORE IMPORTS
import { AppState } from '../../store';
import { getBookedPosts } from '../../store/post/selectors';
import EmptyPost from '../../shared/components/EmptyPost/EmptyPost';
// STORE PROPS
const mapStateToProps = (state: AppState) => {
  return {
    bookedPosts: getBookedPosts(state),
  };
};

interface IProps {
  navigation: NavigationStackProp;
}
type Props = ReturnType<typeof mapStateToProps> & IProps;

const BookedScreen = ({ navigation, bookedPosts }: Props) => {
  const handleOpenPost = (post: DataDB) => {
    navigation.navigate('Post', {
      postId: post.id,
      postDate: post.date,
      booked: post.booked,
    });
  };

  if (bookedPosts.length === 0) {
    return <EmptyPost title='Избранного нету' />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <PostList dataProps={bookedPosts} onOpen={handleOpenPost} />
    </SafeAreaView>
  );
};

BookedScreen.navigationOptions = ({ navigation }: Props) => ({
  headerTitle: 'Избранное',
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

export default connect(mapStateToProps)(BookedScreen);
