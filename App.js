import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import StartApp from './src/navigation/startApp';

const App = () => {
  return (
    <NavigationContainer>
      <StartApp />
    </NavigationContainer>
  );
};

export default App;
