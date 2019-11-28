import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './createSrtyles';
import AppHeaderIcon from '../../components/AppHeaderIcon/AppHeaderIcon';

// STORE IMPORTS
import { Actions } from '../../store/post/actions';
import { DTOProps } from '../../shared/interfaces/data';
import PhotoPicker from '../../components/PhotoPicker/PhotoPicker';
// STORE PROPS

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPost: (payload: DTOProps) => dispatch(Actions.addPost(payload)),
});

interface IProps {
  navigation: NavigationStackProp;
}

type Props = ReturnType<typeof mapDispatchToProps> & IProps;

const CreateScreen = ({ addPost, navigation }: Props) => {
  const [postText, setPostTExt] = useState('');
  const [imagePick, setImagePick] = useState('');

  const handleSavePost = () => {
    const post: DTOProps = {
      date: new Date().toJSON(),
      img: imagePick,
      text: postText,
      booked: 0,
    };
    addPost(post);
    navigation.navigate('Main');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <TextInput
            placeholder='текст поста'
            value={postText}
            onChangeText={setPostTExt}
            multiline
            style={styles.textArea}
          />
          <PhotoPicker onPick={setImagePick} />
          <Button
            title='add'
            onPress={handleSavePost}
            disabled={!postText || !imagePick}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

CreateScreen.navigationOptions = ({ navigation }: Props) => ({
  headerTitle: 'Создать пост',
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

export default connect(null, mapDispatchToProps)(CreateScreen);
