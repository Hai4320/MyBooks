

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/tabs'
import Splash from './src/screens/Splash'
import Start from './src/screens/Start'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Notification from './src/screens/Notification'
import ResetPassword from './src/screens/ResetPassword'
import BookAudio from './src/screens/BookAudio'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import BookPDF from './src/screens/BookPDF'
import BookDetail from './src/screens/BookDetail'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="splash" component={Splash}/>
        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Login" component={Login}/> 
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="TabBar" component={Tabs}/>
        <Stack.Screen name="Notification" component={Notification}/>
        <Stack.Screen name="BookAudio" component={BookAudio}/>
        <Stack.Screen name="BookPDF" component={BookPDF}/>
        <Stack.Screen name="BookDetail" component={BookDetail}/>
      </Stack.Navigator>

    </NavigationContainer>
    </Provider>
  );
};

export default App;
