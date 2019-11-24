import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Post from '../../../components/Post/Post';
import { Data } from './../../interfaces/data';

interface Props {
  dataProps: Data[];
  onOpen: (post: Data) => void;
}

const PostList: React.FC<Props> = ({ dataProps, onOpen }) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={dataProps}
        keyExtractor={(post: Data) => post.id}
        renderItem={({ item }) => <Post item={item} onOpen={onOpen} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    width: '100%',
  },
});

export default PostList;
