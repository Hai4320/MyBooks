<<<<<<< HEAD
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/tabs'
import Splash from './src/screens/Splash'
import Start from './src/screens/Start'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import ResetPassword from './src/screens/resetPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
=======
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import Splash from './src/screens/Splash';
import StartApp from './src/navigation/StartApp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
>>>>>>> 70770db4b23bde7358e104c62b69453f42417f4a

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
<<<<<<< HEAD
          headerShown: false
        }}
      >
        
        <Stack.Screen name="splash" component={Splash}/>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="TabBar" component={Tabs}/>
      </Stack.Navigator>
=======
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="TabBar" component={Tabs} />
      </Stack.Navigator> */}
      <StartApp />
>>>>>>> 70770db4b23bde7358e104c62b69453f42417f4a
    </NavigationContainer>
  );
};

export default App;
