import React, { useState } from 'react';
import { View, Image, StyleSheet, Platform, TouchableOpacity, Text, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const requestPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );

      if (result === RESULTS.GRANTED) {
        pickImage();
      } else {
        Alert.alert('Permission denied', 'You need to grant permission to access the photo library.');
      }
    } catch (error) {
      console.error('Permission request error: ', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0]);
        uploadImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append('file', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Image upload error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={requestPermission}
      >
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ImagePickerComponent;
