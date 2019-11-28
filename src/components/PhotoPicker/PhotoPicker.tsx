import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

async function getPermissionAsync() {
  if (Platform.OS === 'ios') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert.alert('Ошибка.', 'Нет прав на создания фото');
      return false;
    }
  }

  return true;
}

interface Props {
  onPick: (data: string) => void;
}

const PhotoPicker = ({ onPick }: Props) => {
  const [img, setImg] = useState<null | string>(null);
  const handleTakePhoto = async () => {
    const hasPermition = await getPermissionAsync();
    if (!hasPermition) {
      return;
    }
    const imgage = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });
    if (!imgage.cancelled) {
      setImg(imgage.uri);
      onPick(imgage.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Сдедать фото' onPress={handleTakePhoto} />
      {img && <Image style={styles.img} source={{ uri: img }} />}
    </View>
  );
};

export default PhotoPicker;
