import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import { Data } from '../../shared/interfaces/data';

import styles from './postStyle';

interface Props {
  item: Data;
  onOpen: (post: Data) => void;
}

const Post: React.FC<Props> = ({ item, onOpen }) => {
  const handleOpen = () => {
    onOpen(item);
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handleOpen}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={{ uri: item.img }}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Post;
