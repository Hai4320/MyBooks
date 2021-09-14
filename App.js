import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/tabs'
import Splash from './src/screens/Splash'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="splash"
          component={Splash}
        />
        <Stack.Screen
          name="TabBar"
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
