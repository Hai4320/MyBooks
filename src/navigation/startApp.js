import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from '../screens/Start';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ResetPassword from '../screens/resetPassword';

const Stack = createNativeStackNavigator();

const StartApp = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerLargeStyle: false,
        headerBackVisible: false,
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default StartApp;
