import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserList from '../components/UserList';

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <UserList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default UserScreen;
