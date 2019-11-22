import React from 'react';
import { View, Text } from 'react-native';

import styles from './postScreenStyle';

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
    </View>
  );
};

PostScreen.navigationOptions = {
  headerTitle: 'post',
};

export default PostScreen;
