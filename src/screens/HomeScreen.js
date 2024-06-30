import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyComponent from '../components/MyComponent';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <MyComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
