import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Touchable, Pressable, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const MyFlatList = () => {
    const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();

    return () => {
      setData([]);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?page=${page}`);
      const result = await response.json();
      setData(prevData => [...prevData, ...result]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    setPage(prevPage => prevPage + 1);
    fetchData();
  };

  const renderHeader = () => (
    <View style={styles.header}>
    </View>
  );

  const renderFooter = () => (
    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
  );
 
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
      <Text>user detail</Text>
      <Text>{item?.name}</Text>
      <Text>{item?.company?.bs}</Text>
      <Text>{item?.company?.catchPhrase}</Text>
      <Text>{item?.phone}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>handleAddUser(item)}>
      <Text style={styles.addUserTextStyle}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
  const handleAddUser = (item) => {
    console.log("🚀 ~ handleAddUser ~ item:", item)
    
     dispatch(addUser(item));
   };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  addUserTextStyle:{color:'green',fontSize:20},
  deleteUserTextStyle:{color:'red',fontSize:20}
});

export default MyFlatList;
