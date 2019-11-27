import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Post from '../../../components/Post/Post';
import { DataDB } from '../../interfaces/data';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    width: '100%',
  },
});

interface Props {
  dataProps: DataDB[];
  onOpen: (post: DataDB) => void;
}

const PostList: React.FC<Props> = ({ dataProps, onOpen }) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={dataProps}
        keyExtractor={(post: any) => post.id.toString()}
        renderItem={({ item }) => <Post item={item} onOpen={onOpen} />}
      />
    </View>
  );
};

export default PostList;
