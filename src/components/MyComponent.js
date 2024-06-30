import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MyFlatList from './MyFlatList';
import AudioPlayer from './AudioPlayer';
import ImagePickerComponent from './ImagePickerComponent';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
      <MyFlatList />
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ffff' }]}>
   <AudioPlayer />
   <ImagePickerComponent/>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const MyComponent = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
      
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => <TabBar {...props} />}
      />
  );
};

const styles = StyleSheet.create({
 
});

export default MyComponent;
