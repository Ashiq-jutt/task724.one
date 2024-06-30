import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
      <UserScreen />
    </Provider>
  );
};

export default App;
